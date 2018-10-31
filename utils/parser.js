const fountain = require('./fountain-master/index');
const fs = require('fs');
const DB = require('../models/store');

let fountainFile = process.argv.length > 2 ? process.argv[2] : 'dispersao.fountain';

fs.readFile(fountainFile, 'utf-8', (err, data) => {
  if(err){
    console.log(err);
  } else {
    const script = data;
    const film = fountain.parse(data, true, processTokens);
    includeNonDialogueCharsToScenes(film);
    store(film);
  }
});

const processTokens = output => {
    const sequences = [];
    const characters = [];
    const types = [];
    const locations = [];
    let sequence;

    output.tokens.forEach(token =>{

      switch(token.type){

        case 'scene_heading':
          sequence = {characters:[], content:'', actions:[], parts: []};
          const type_location = token.text.split('-');
          sequence.type = type_location[0].trim();
          sequence.location = type_location[1].trim();

          addUniqueElement(types, sequence.type);
          addUniqueElement(locations, sequence.location);

          sequences.push(sequence);
        break;

        case 'dialogue_begin':
          sequence.parts.push({index: sequence.parts.length, type: 'dialogue'});
        break;

        case 'character':
          const char = token.text;
          sequence.parts[sequence.parts.length -1].characters = [char];
          addUniqueElement(sequence.characters, char);
          addUniqueElement(characters, char);
        break;

        case 'parenthetical':
          sequence.parts[sequence.parts.length -1].extra = token.text;
        break;

        case 'dialogue':
          sequence.parts[sequence.parts.length -1].content = token.text;
        break;

        case 'action':
          const action = token.text;
          sequence.actions.push(action);
          sequence.parts.push({index: sequence.parts.length, type: 'action', content: token.text});
        break;
      }
      if(sequence && token.text != undefined && token.type !== 'scene_heading'){
        sequence.content+= token.text + '<br />';
      }
    });
    return {sequences: sequences, characters: characters, types: types, locations: locations};
}

const includeNonDialogueCharsToScenes = (film) => {
  film.sequences.forEach(sequence => {
    sequence.parts
    .filter(part => part.type === 'action')
    .forEach(actionPart => {
      actionPart.characters = [];
      film.characters.forEach(char => {
        const reg = new RegExp(`\\b${char}\\b`, 'gmi');
        if(actionPart.content.match(reg)){
          addUniqueElement(sequence.characters, char, true);
          addUniqueElement(actionPart.characters, char, true);
        }
      });
    });
  });
}

const store= (film) => {
  let db = new DB();
  db.populateTables(film)
  .then(()=> {
    console.log('all done');
    process.exit();
  }, (err) => {
    console.log(err);
    process.exit();
  });
}

const addUniqueElement = (chars, char, log) => {
  if(!chars.includes(char)){
    chars.push(char);
  }
}
