
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
      const db = {
        Character: this.sequelize.import('./models/character'),
        Location: this.sequelize.import('./models/location'),
        Sequence: this.sequelize.import('./models/sequence'),
        Type: this.sequelize.import('./models/type'),
        SequenceCharacter: this.sequelize.import('./models/sequenceCharacter')
      };

      Object.keys(db).forEach((modelName) => {
        if ('associate' in db[modelName]) {
          db[modelName].associate(db);
        }
      });

      const staticData = ['characters', 'types', 'locations']
      .map(modelType => {
         const modelName = this.getModelName(modelType);

      })

      this.sequelize
      .sync({force:true})
      .then(()=>{
        return film.sequences.map(seq => {
          return db.Sequence.create(seq)
          .then((dbSeq) => {
            let typePormise = db.Type.findOrCreate({where: {name: seq.type}})
            .spread((dbType, created) => dbSeq.setType(dbType));

            let locationPromise = db.Location.findOrCreate({where: {name: seq.location}})
            .spread((dbLoc, created) => dbSeq.setLocation(dbLoc));

            let charactersPromises = seq.characters.map(charac => {
              return db.Character.findOrCreate({where: { name: charac}})
              .spread((dbChar, created) => {
                 dbSeq.setCharacters([dbChar]);
              });
            });
            return Promise.all([ typePormise, locationPromise, charactersPromises]);
          })
        })
      })
      .then(arr => {
        console.log("aeeee"+arr);
      })
    }




    /**

    const list= Object.keys(film).map((key) => {
      const modelName = this.getModelName(key);
      let formattedData = film[key];
      if(db[modelName]){
        if(db[modelName].formatDataForStorage){
          formattedData = db[modelName].formatDataForStorage(film[key])
       }
       return db[modelName].bulkCreate(formattedData);
     }
   });

   return Promise.all(list);*/

    createAndPopulateTable(name, values){
      return this.sequelize
      .authenticate()
      .then(() => {
        const table = this.sequelize.define(this.getTableName(name), {
          content: {
            type: Sequelize.TEXT,
            allowNull: false
          }
        });
        TABLES.push({name: name, table: table});
        return table;
      })
      .then(table => {
        return table.sync({force: true});
      })
      .then(table => {
        const modelSchema = values[0];
        const associations = [];
        Object.keys(modelSchema).forEach(attr => {
          const corrTable = TABLES.find(table => table.name === `${attr}s`);

          if(corrTable){
            if(Array.isArray(modelSchema[attr])){
              console.log('should create a list');
            } else {
              table[attr] = table.belongsTo(corrTable.table);
              associations.push(table[attr]);
              // corrTable.table.belongsToMany(table);
            }
          }
        });

        return values.map(obVal=> table.create(obVal, {include: associations}));
      })
      .catch(err => {
        console.error('error:', err);
      });
    }

    getModelName(name){
      return name.charAt(0).toUpperCase() + name.slice(1, -1);
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
