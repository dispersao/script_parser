
const Store = require('../models/store');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Searcher = (()=>{

  const search = (modelname, query) =>{
    store = new Store();
    return store.init()
    .then(function(){
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
      });
    });
  };

  const getSequences = (query)=>{

    let promise;
    let queries = {
      where:{isEnabled: true},
      attributes: { exclude: ['isEnabled','locationId', 'typeId', 'content'] },
      include: [
          {model: store.db.Location,  as: 'location'},
          {model: store.db.Type,  as: 'type'},
          {model: store.db.Part, attributes: [
            'index','content', 'type', 'extra'
          ], include: [
            {model: store.db.Character, attributes: {exclude: ['part_character']}}
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
          attributes: ['id'],
          include: {
            model: store.db.Character, attributes: ['id'], where:{id: {[Op.in]: ids}}
          }
        })
        .then((sequences)=> {
          let seqs = sequences;
          if(filters.characters.and){
             seqs = sequences.filter((seq)=>{
              return seq.characters.length === ids.length;
            });
          }
          let seqOperator = filters.characters.exclusive ? Op.notIn : Op.in;
          return {id: {[seqOperator]: seqs.map(s => s.id)}};
        })

        promises.push(promise);

        //  promises.push(store.db.Part.findAll({
        //   attributes: ['sequenceId'],
        //   include: {
        //     model: store.db.Character, attributes: [], where:
        //     {
        //       id: {[Op.in]: filters.characters.ids.split(',')}
        //     }
        //   }
        // })
        // .then(parts => {
        //   return {id: {[Op.in]: parts.map(part => part.sequenceId)}};
        // }));
      }
    }

    return Promise.all(promises)
    .then(whereQueries => {
      queries.where = Object.assign.apply(Object, [{}].concat(whereQueries));
      return store.db.Sequence.findAll(queries);
    });
  }

  this.search = search;
  this.getSequences = getSequences;

  return this;
})();
module.exports = Searcher;
