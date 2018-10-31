
const Store = require('./store');

const Searcher = (()=>{

  this.search = (ob) =>{
    let promise;
    store = new Store();
    return store.init()
    .then(function(){
      switch(ob){
        case 'location':
          promise = store.db.Location.findAll();
        break;

        case 'type':
          promise = store.db.Type.findAll();
        break;

        case 'character':
          promise = store.db.Character.findAll();
        break;
      }
      return promise.then((list)=>{
        return list;
      });
    });
  }

  return this;
})();
module.exports = Searcher;
