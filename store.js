
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
        Part: this.sequelize.import('./models/part'),
        SequenceCharacter: this.sequelize.import('./models/sequenceCharacter'),
        PartCharacter: this.sequelize.import('./models/partCharacter'),
        // SequencePart: this.sequelize.import('./models/sequencePart'),
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
                  return this.createRelationEntries(dbPart, 'character', part.characters);
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
      this.createTables();
      return this.sequelize.sync();
    }

    search(query, field){
      return this.init()
      .then(()=> {
        return this.db.Sequence.findAll({
                where: {
                   '$location.name$': query
                },
                include: [
                    {model: this.db.Location,  as: 'location'}
                ]
            });
          }, (err)=>{
            return Promise.reject(err);
          });

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
  }
module.exports = DB;
