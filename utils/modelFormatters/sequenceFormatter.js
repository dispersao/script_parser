const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getSequences = (store, query)=>{

  let promise;
  let queries = {
    where:{hasPlayed: false},
    attributes: { exclude: ['isPlaying', 'locationId', 'typeId', 'content'] },
    include: [
        {model: store.db.Location,  as: 'location'},
        {model: store.db.Type,  as: 'type'},
        {model: store.db.Part, as:'parts', attributes: [
          'id','index','content', 'type', 'extra'
        ], include: [
          {model: store.db.Character, as:'characters', attributes: {include: ['name']}}
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

module.exports = getSequences;
