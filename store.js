
  const dbconfig = require('./dbconfig');
  const Sequelize = require('sequelize');

  class DB {

    constructor( config ) {
      const dbConf = dbconfig.localhost;
        this.sequelize = new Sequelize(dbConf.database, dbConf.user, dbConf.password, {
        host: dbConf.server,
        dialect: 'mysql'
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
        const seqs = film.sequences.map(seq => {
          return this.db.Sequence.create(seq)
          .then((dbSeq) => {
            const relationPromises = [];

            relationPromises.push(this.createRelationEntry(dbSeq, 'type', seq.type));
            relationPromises.push(this.createRelationEntry(dbSeq, 'location', seq.location));
            relationPromises.push(this.createRelationEntries(dbSeq, 'character', seq.characters));

            return Promise.all(relationPromises);
          })
        });
        return Promise.all(seqs);
      });
    }

    createRelationEntry(dbSeq, name, value){
      const tableName =  this.getTableName(name);

      return this.db[tableName]
      .findOrCreate({ where: {name: value} })
      .spread((dbEntry, created)=> dbSeq[`set${tableName}`].call(dbSeq, dbEntry));
    }

    createRelationEntries(dbSeq, name, values){
      const tableName = this.getTableName(name);
      let methodName = `${tableName}s`;

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

    getTableName(name){
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
module.exports = DB;
