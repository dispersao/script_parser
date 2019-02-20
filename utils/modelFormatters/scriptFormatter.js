const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getScript = (store, query)=>{

  let queries = {
    include: [
        { model: store.db.ScriptSequence, attributes: 
          { exclude:
            ['createdAt', 'updatedAt']
          }
        }
    ]
  };

  return store.db.Script.findAll(queries);
}

module.exports = getScript;
