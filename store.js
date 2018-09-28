
  const mysql = require('mysql');
  const dbconfig = require('./dbconfig');
  //ALTER TABLE users ADD CONSTRAINT fk_grade_id FOREIGN KEY (grade_id) REFERENCES grades(id);

  class DB {
    constructor( config ) {
        this.connection = mysql.createConnection(dbconfig.localhost);
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
    createTables(film){
      const tables = ['characters', 'locations', 'types'];
      tables.forEach((tableName) => this.createAndPopulateSimpleTables(tableName, film[tableName]));
      // this.createScenesTables(film.scenes);
    }
    createAndPopulateSimpleTables(name, values){
      const db = this;

      this.query(this.getQuery('deleteTable', name))
      .then( data => db.query(db.getQuery('createTable', name)))
      .then( data => {
        return db.insertValues(name, values);
      })
      .then(rows => console.log(name, rows), err => console.log(name, err));
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
