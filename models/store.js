
  // const dbconfig = require('../config/dbconfig');
  const Sequelize = require('sequelize');

  class DB {

    constructor( config ) {
    }

    connect(){
      if(!this.sequelize){
        const dbConf = this.getDBConfig();
          this.sequelize = new Sequelize(dbConf.database, dbConf.user, dbConf.password, {
          host: dbConf.server,
          dialect: 'mysql'
        });
        return this.sequelize.authenticate();
      } else {
        return Promise.resolve(true);
      }
    }

    testAutentication(){
      return this.sequelize.authenticate();
    }

    closeConnection(){
      return this.sequelize.close();
    }

    createTables(){
      this.db = {
        Character: this.sequelize.import('./db/character'),
        Location: this.sequelize.import('./db/location'),
        Sequence: this.sequelize.import('./db/sequence'),
        Type: this.sequelize.import('./db/type'),
        Part: this.sequelize.import('./db/part'),
        SequenceCharacter: this.sequelize.import('./db/sequenceCharacter'),
        PartCharacter: this.sequelize.import('./db/partCharacter'),
      };

      Object.keys(this.db).forEach((modelName) => {
        if ('associate' in this.db[modelName]) {
          this.db[modelName].associate(this.db);
        }
      });
    }

    populateTables(film){
      this.createTables();

      return this.sequelize
      .sync({force:true})
      .then(()=>{

        let promises = [];

        promises.push(this.createSimpleEntry('location', film.sequences.map(seq => seq.location)));
        promises.push(this.createSimpleEntry('type', film.sequences.map(seq => seq.type)));
        promises.push(this.createSimpleEntry('character', [].concat(...film.sequences.map(seq => seq.characters))));
        return Promise.all(promises);
      })
      .then(()=>{
        const seqs = film.sequences.map(seq => {
          return this.db.Sequence.create(seq)
          .then((dbSeq) => {
            const relationPromises = [];

            relationPromises.push(this.createRelationEntry(dbSeq, 'type', seq.type));
            relationPromises.push(this.createRelationEntry(dbSeq, 'location', seq.location));
            relationPromises.push(this.createRelationEntries(dbSeq, 'character', seq.characters));

            const partsPromise = this.createRelationEntries(dbSeq, 'part', seq.parts, true)
            .then((dbParts) => {
                const maped = dbParts.map(dbPart => {
                  const dbVals = dbPart.dataValues;
                  const part = seq.parts.find(part => {
                    return part.content == dbVals.content && part.index == dbVals.index && part.type == dbVals.type
                  });
                  if(part.characters){
                    return this.createRelationEntries(dbPart, 'character', part.characters);
                  } else {
                    return null;
                  }
                });
              return Promise.all(maped);
            });

            relationPromises.push(partsPromise);

            return Promise.all(relationPromises);
          });
        });
        return Promise.all(seqs);
      });
    }

    init(){
      return this.connect()
      .then(()=>{
        this.createTables();
        return this.sequelize.sync();
      }, (err)=>{
        return Promise.reject({status: 'error', message:'connectionError', code: err.original.errno });
      });
    }

    createSimpleEntry(name, values){
      const tableName =  this.getTableName(name);
      values = [...new Set(values)];
      let valuesFormatted = values.map(v => this.db[tableName].formatData(v));
      console.log(valuesFormatted);
      return this.db[tableName].bulkCreate(valuesFormatted);
    }


    createRelationEntry(dbObj, name, value){
      const tableName =  this.getTableName(name);

      return this.db[tableName]
      .findOrCreate({ where: this.db[tableName].formatData(value) })
      .spread((dbEntry, created)=> dbObj[`set${tableName}`].call(dbObj, dbEntry));
    }

    createRelationEntries(dbObj, name, values, forceNewEntry){
      const tableName = this.getTableName(name);
      let methodName = `${tableName}s`;
      const model = this.db[tableName];

      return Promise.all(
        values.map((val) => {
          const dataFormated = model.formatData(val);
          if(forceNewEntry){
            return model.create(dataFormated);
          } else{
            return model.findOrCreate({ where: dataFormated})
            .spread((dbEntry,create) => Promise.resolve(dbEntry));
          }
        })
      )
      .then((dbEntries) => {
        return dbObj[`set${methodName}`].call(dbObj, dbEntries)
        .then((dbObj) => Promise.resolve(dbEntries));
      });
    }

    getTableName(name, plural){
      let len = plural ? -1 : name.length;
      return name.charAt(0).toUpperCase() + name.slice(1, len);
    }

    getDBConfig(){
      let cred = {};
      const regex = /(\/\/)([a-zA-Z0-9]+)(\:)([a-zA-Z0-9]+)(@)([a-zA-Z0-9-._]+)(\/)([a-zA-Z0-9-._]+)(?=\?)/m;
      let dbCred = process.env.CLEARDB_DATABASE_URL.match(regex);
      if(dbCred && dbCred.length>=9){
        cred.user = dbCred[2];
        cred.password = dbCred[4];
        cred.server = dbCred[6];
        cred.database = dbCred[8];
      }
      return cred;
    }
  }

module.exports = DB;
