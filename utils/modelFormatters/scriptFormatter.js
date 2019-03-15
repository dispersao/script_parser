const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getScript = (store, query)=>{

  let queries = {
    include: [
        { model: store.db.ScriptSequence,  as:'scriptSequences', attributes:
          { exclude:
            ['createdAt', 'updatedAt', 'index']
          }
        }
    ],
    order: [
        [ ['id', 'ASC'], { model: store.db.ScriptSequence,  as:'scriptSequences' }, 'index', 'ASC']
      ]
  };

  return store.db.Script.findAll(queries);
}

module.exports = getScript;
