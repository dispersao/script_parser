
const Store = require('../models/store');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Searcher = (()=>{

  const search = (modelname, query) =>{
    store = new Store();
    return store.init()
    .then(()=>{
      switch(modelname){
        case 'location':
          promise = store.db.Location.findAll();
        break;

        case 'type':
          promise = store.db.Type.findAll();
        break;

        case 'character':
          promise = store.db.Character.findAll();
        break;

        case 'sequence':
          promise = getSequences(query);
        break;
      }
      return promise.then((list)=>{
        return list;
      }, (err)=>{
        return Promise.reject({status: 'error', message:'connectionError', errorno: err.original.errno || -1, code: err.original.code });
      });
    });
  };

  const getSequences = (query)=>{

    let promise;
    let queries = {
      where:{hasPlayed: false},
      // attributes: { exclude: ['isPlaying', 'locationId', 'typeId', 'content'] },
      include: [
          {model: store.db.Location,  as: 'location'},
          {model: store.db.Type,  as: 'type'},
          {model: store.db.Part, as:'parts', attributes: [
            'index','content', 'type', 'extra'
          ], include: [
            {model: store.db.Character, as:'characters', attributes: {exclude: ['part_character']}}
          ]}
      ]
    };

    let promises = [];

    if(query.filter){
      const filters = query.filter;

      if(filters.locations){
        let locOperator = filters.locations.exclusive ? Op.notIn : Op.in;
        promises.push(Promise.resolve({locationId:{[locOperator]: filters.locations.ids.split(',')}}));
      }
      if(filters.types){
        let typeOperator = filters.types.exclusive ? Op.notIn : Op.in;
        promises.push(Promise.resolve({typeId:{[typeOperator]: filters.types.ids.split(',')}}));
      }
      if(filters.characters){
        let ids = filters.characters.ids.split(',');

        let promise = store.db.Sequence.findAll({
          include: [{
              model: store.db.Part,
              as: 'parts', include:[{
                model: store.db.Character,
                as: 'characters'
              }]
          }],
          where: {
               '$parts.characters.id$': {[Op.in]: ids }
           }
        })
        .then(seqs => {
          let seqsChars = seqs.map(s=> {
            let characters = s.parts.map(p => {
              return p.characters.map(c => c.id);
            });
            characters = [].concat(...characters);
            characters = [...new Set(characters)];
            return new Object({id:s.id, chars: characters});
          })
          if(filters.characters.and){
            seqsChars = seqsChars.filter(s=> s.chars.length === ids.length)
          }

          let seqOperator = filters.characters.exclusive ? Op.notIn : Op.in;
          return {id: {[seqOperator]: seqsChars.map(s => s.id)}};
        });
        promises.push(promise);
      }
    }

    return Promise.all(promises)
    .then(whereQueries => {
      queries.where = Object.assign.apply(Object, [queries.where].concat(whereQueries));
      if(query.order && query.order === 'rand'){
        queries.order = Sequelize.fn('RAND');
      } else {
        queries.order = [['id', 'ASC']];
      }
      if(query.count && Number(query.count) === 1){
        return store.db.Sequence.findOne(queries);
      } else {
        return store.db.Sequence.findAll(queries);
      }
    });
  }

  this.search = search;
  this.getSequences = getSequences;

  return this;
})();
module.exports = Searcher;
