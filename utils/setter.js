
const Store = require('../models/store');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Setter = (()=>{

  const update = (modelname, id, query) =>{
    store = new Store();
    return store.init()
    .then(()=>{
      switch(modelname){
        case 'sequence':
          promise = updateSequence(id, query);
        break;
      }
      return promise.then((list)=>{
        return list;
      });
    });
  };

  const updateSequence = (id, query)=>{
    let wh = id ? {id: id} : {hasPlayed: {[Op.ne]: null}};
    return store.db.Sequence.update(query, {'where' : wh});
  }

  this.update = update;
  this.updateSequence = updateSequence;

  return this;
})();
module.exports = Setter;
