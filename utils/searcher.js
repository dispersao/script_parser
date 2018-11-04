
const Store = require('../models/store');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Searcher = (()=>{

  const search = (modelname, filters) =>{
    let promise;
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
          promise = getSequences(filters);
        break;
      }
      return promise.then((list)=>{
        return list;
      });
    });
  };

  const getSequences = (filters)=>{
    let promise;
    let queries = {
      where:{},
      attributes: { exclude: ['isEnabled','locationId', 'typeId', 'content'] },
      include: [
          {model: store.db.Location,  as: 'location'},
          {model: store.db.Type,  as: 'type'},
          {model: store.db.Part, attributes: [
            'index','content', 'type', 'extra'
          ], include: [
            {model: store.db.Character, attributes: {exclude: ['part_character']}}
          ]}
      ]};


      // return store.db.Sequence.findAll(
      //   {
      //     attributes: { exclude: ['isEnabled','locationId', 'typeId', 'content'] },
      //     include:[
      //     {model: store.db.Location,  as: 'location'},
      //     {model: store.db.Type,  as: 'type'},
      //     {model: store.db.Part, required: true, attributes: [
      //       'index','content', 'type', 'extra'
      //     ], include: {
      //       model: store.db.Character, required: true, attributes: [], where:
      //       {
      //         id: {[Op.in]: filters.characters.split(',')}
      //       }
      //     }
      //   }]
      // })

    let promises= [];
    if(filters.locations){
      promises.push(Promise.resolve({locationId:{[Op.or]: filters.locations.split(',')}}));
    }
    if(filters.types){
      promises.push(Promise.resolve({typeId:{[Op.or]: filters.types.split(',')}}));
    }
    if(filters.characters){
      promises.push(store.db.Part.findAll({
        attributes: ['sequenceId'],
        include: {
          model: store.db.Character, attributes: [], where:
          {
            id: {[Op.in]: filters.characters.split(',')}
          }
        }
      })
      .then(parts => {
        return {id: {[Op.or]: parts.map(part => part.sequenceId)}};
      }));
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