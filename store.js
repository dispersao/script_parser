const uniqBy = require('lodash/uniqBy');
const create = require('./api')

const store = async (film, app) => {
  const fields = ['locations', 'characters', 'types'];
  let entries = {};

  fields.forEach(field => {
    entries[field] = film[field].map(entryname => {
      return create(field, {
      // return app.services[field].create({
        name: entryname
      }).catch(e => console.log(e))
    });
  });
  

  let locations = await Promise.all(entries.locations);
  let types = await Promise.all(entries.types);
  let characters = await Promise.all(entries.characters);
  let sequences = [];

  let arcCategories = film.categories
    .filter(c => c.type === 'arc')
    .map(cat => {
      return {
        text: cat.text,
        type: cat.type,
        characters: nameToCharId((cat.characters||[]), characters)
      }
    });

  let otherCategories = film.categories.filter(c => c.type !== 'arc');
  
  entries.categories = arcCategories.concat(otherCategories).map(cat => {
    // return app.services.categories.create(cat)
    return create('categories',cat)
  });

  let categories = await Promise.all(entries.categories);

  let sequencesData = film.sequences.map(seq => {
    let mapped = {
      sceneNumber: seq.sceneNumber,
      location: locations.find(e => e.name === seq.location).id,
      type: types.find(e => e.name === seq.type).id,
      duration: (seq.duration || 0),
      categories: mapCategories(seq.categories, categories),
      parts: seq.parts.map(p =>({
        index: p.index,
        content: p.content,
        type: p.type,
        characters: nameToCharId(p.characters ||[], characters)
      }))
    }
    return mapped;
  })

  createSeq(sequencesData, 0, app, sequences);
}

const mapCategories = (seqCategories, categories) => {
  return seqCategories.map(scat => {
    const category = categories.find(cat => cat.text.toString() === scat.text.toString() && cat.type === scat.type)

    return category.id;
  });
}

const createSeq = (seqs, index, app, sequences) => {
  // app.services.sequences.create(seqs[index])
    create('sequences', seqs[index])
    .then(el => {
      sequences.push(el);
      if(index < seqs.length - 1){
        createSeq(seqs, index + 1, app, sequences);
      } 
    })
    .catch(e => console.log(e))
}

const nameToCharId = (list, characters)=>{
  return list.map(ch => characters.find(cch=> cch.name === ch).id)
}

module.exports = store
