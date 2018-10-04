
  const dbconfig = require('./dbconfig');
  const Sequelize = require('sequelize');

  class DB {

    constructor( config ) {
      const dbConf = dbconfig.localhost;
        this.sequelize = new Sequelize(dbConf.database, dbConf.user, dbConf.password, {
        host: dbConf.server,
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      });
    }

    createTables(){
      this.db = {
        Character: this.sequelize.import('./models/character'),
        Location: this.sequelize.import('./models/location'),
        Sequence: this.sequelize.import('./models/sequence'),
        Type: this.sequelize.import('./models/type'),
        SequenceCharacter: this.sequelize.import('./models/sequenceCharacter')
      };

      Object.keys(this.db).forEach((modelName) => {
        if ('associate' in this.db[modelName]) {
          this.db[modelName].associate(this.db);
        }
      });
    }

    populateTables(film){
      this.createTables();

      this.sequelize
      .sync({force:true})
      .then(()=>{
        const seqs=film.sequences.map(seq => {
          return this.db.Sequence.create(seq)
          .then((dbSeq) => {
            const relationPromises = [];

            relationPromises.push(this.createSingleRelationEntry(dbSeq, 'type', seq.type));
            relationPromises.push(this.createSingleRelationEntry(dbSeq, 'location', seq.location));
            relationPromises.push(this.createListRelationEntry(dbSeq, 'character', seq.characters));

            // relationPromises.push(
            //   db.Type
            //   .findOrCreate({where: {name: seq.type}})
            //   .spread((dbType, created) => dbSeq.setType(dbType))
            // );
            //
            // relationPromises.push(
            //   db.Location
            //   .findOrCreate({where: {name: seq.location}})
            //   .spread((dbLoc, created) => dbSeq.setLocation(dbLoc))
            // );

            // let chars = seq.characters.map(charac => {
            //   return db.Character.findOrCreate({where: { name: charac}})
            //   .spread((dbChar, created) =>  dbChar);
            // });
            // relationPromises.push(Promise.all(chars).then(dbCharList => dbSeq.setCharacters(dbCharList)));

            return Promise.all(relationPromises);
          })
        });
        return Promise.all(seqs);
      });
    }

    createSingleRelationEntry(dbSeq, name, value){
      const tableName =  name.charAt(0).toUpperCase() + name.slice(1);

      return this.db[tableName]
      .findOrCreate({ where: {name: value} })
      .spread((dbEntry, created)=> dbSeq[`set${tableName}`].call(dbSeq, dbEntry));
    }

    createListRelationEntry(dbSeq, name, values){
      const tableName =  name.charAt(0).toUpperCase() + name.slice(1);
      const methodName = `${tableName}s`;
      console.log(tableName, methodName);

      return Promise.all(
        values.map((val) => {
            return this.db[tableName]
            .findOrCreate({where: {name:val}})
            .spread((dbEntry,created) => dbEntry);
          }
        )
      )
      .then((dbEntries) => {
        return dbSeq[`set${methodName}`].call(dbSeq, dbEntries)
      });
    }

  }
module.exports = DB;
