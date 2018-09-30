
  const dbconfig = require('./dbconfig');
  const Sequelize = require('sequelize');
  let TABLES = [];

  //ALTER TABLE users ADD CONSTRAINT fk_grade_id FOREIGN KEY (grade_id) REFERENCES grades(id);

  class DB {

    constructor( config ) {
      const db = dbconfig.localhost;
        // this.connection = mysql.createConnection(dbconfig.localhost);
        this.sequelize = new Sequelize(db.database, db.user, db.password, {
        host: db.server,
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      });
    }

    createTables(film){
      const tables = ['characters', 'locations', 'types'];
      tables.forEach((tableName) => this.createAndPopulateSimpleTables(tableName, film[tableName]));
      // this.createScenesTables(film.scenes);
    }
    createAndPopulateSimpleTables(name, values){
      this.sequelize
      .authenticate()
      .then(() => {
        return this.sequelize.define(name, {
          content: {
            type: Sequelize.STRING,
            allowNull: false
          }
        });
      })
      .then(table => {
        TABLES.push(table);
        return table.sync({force: true});
      })
      .then(table => {
        return values
        .map(val => {
          return {content: val};
        })
        .map(obVal=> table.create(obVal))
      })
      .catch(err => {
        console.error('error:', err);
      });
    }

    insertValues(tableName, values){
      const db = this;
      const promises = values.map(val => {
        db.query(db.getQuery('insertValue', tableName, val))
        // db.query(`INSERT INTO ${tableName} (name) VALUES ('${val}')`)
      });
      return Promise.all(promises);
    }
    getQuery(action, table, value){
      switch (action){
        case 'deleteTable':
          return this.getDropTableQuery(table);
        break;

        case 'createTable':;
          return this.getCreateTableQuery(table);
        break;

        case 'insertValue':
        return this.getInsertValuesQuery(table, value);
        break;
      }
    }

    getDropTableQuery(table){
      return `DROP TABLE IF EXISTS ${table}`;
    }

    getCreateTableQuery(table){
      const columns = [
        'id int(1) NOT NULL AUTO_INCREMENT',
        'content varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL'
      ];

      const sceneColumns = columns.concat([
        'type_id int(1) NOT NULL AUTO_INCREMENT',
        'location_id int(1) NOT NULL'
      ]);

      const sceneCharsColumn = [
        'id int(1) NOT NULL AUTO_INCREMENT',
        'scene_id NOT NULL',
        'character_id NOT NULL'
      ];

      let cols = columns;
      if(table === 'scenes'){
        cols = sceneColumns;
      } else if(table === 'scene_character'){
        cols = sceneCharsColumn;
      }
      cols.push('PRIMARY KEY (id)');

      return `CREATE TABLE ${table} (${cols.join(', ')})ENGINE=InnoDB DEFAULT CHARSET=utf8`;
    }

    getInsertValuesQuery(table, value) {
      let valueOb = this.prepareObjectForInsert(table, value);
      let keyNames = Object.keys(valueOb);
      let keyValues = Object.values(valueOb).map((val => `'${val}'`));

      return `INSERT INTO ${table} (${keyNames.join(', ')}) VALUES (${keyValues.join(', ')})`;
    }

    prepareObjectForInsert(table, value){
      if(table === 'scenes'){
        let scene = {};
        scene.content = value.content;
        return scene;
      } else {
        return {content: value};
      }
    }
  }
module.exports = DB;
