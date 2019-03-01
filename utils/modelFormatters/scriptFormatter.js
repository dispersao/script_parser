const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getScript = (store, query)=>{

  let queries = {
    include: [
        { model: store.db.ScriptSequence,  as:'scriptSequences', attributes: 
          { exclude:
            ['createdAt', 'updatedAt']
          }
        }
    ]
  };

  return store.db.Script.findAll(queries);
}

module.exports = getScript;
