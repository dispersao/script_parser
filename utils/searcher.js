
const Store = require('../models/store');
const getSequences = require('./modelFormatters/sequenceFormatter');
const getScripts = require('./modelFormatters/scriptFormatter');

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
          promise = getSequences(store, query);
        break;

        case 'scripts':
          promise = getScripts(store, query);
        break;
      }
      return promise.then((list)=>{
        return list;
      }, (err)=>{
        console.log(err);
        return Promise.reject({status: 'error', message:'connectionError', errorno: err.original.errno || -1, code: err.original.code });
      });
    });
  };



  this.search = search;
  this.getSequences = getSequences;
  this.getScripts = getScripts;

  return this;
})();
module.exports = Searcher;
