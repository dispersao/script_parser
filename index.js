const fountain = require('./fountain-master/index');
const fs = require('fs');
const DB = require('./store');

let fountainFile = process.argv.length > 2 ? process.argv[2] : 'dispersao.fountain';

fs.readFile(fountainFile, 'utf-8', (err, data) => {
  if(err){
    console.log(err)
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
      if(token.type === 'scene_heading'){
        sequence = {characters:[], content:'', actions:[]};
        const type_location = token.text.split('-');
        sequence.type = type_location[0];
        sequence.location = type_location[1];

        addUniqueElement(types, sequence.type);
        addUniqueElement(locations, sequence.location);

        sequences.push(sequence);
      } else if(sequence){
        if(token.type === 'dialogue_begin'){
        } else if(token.type === 'character'){
          const char = token.text;
          addUniqueElement(sequence.characters, char);
          addUniqueElement(characters, char);
        } else if(token.type === 'action'){
          const action = token.text;
          sequence.actions.push(action);
        }
        if(token.text != undefined){
          sequence.content+= token.text + '<br />';
        }
      }
    });
    return {sequences: sequences, characters: characters, types: types, locations: locations};
}

const includeNonDialogueCharsToScenes = (film) => {
  film.sequences.forEach(sequence => {
    const actions = sequence.actions.join(' ');
    film.characters.forEach(char => {
      const reg = new RegExp(char, 'gmi');
      if(actions.match(reg)){
        addUniqueElement(sequence.characters, char, true);
      }
    });
  });
}

const store= (film) => {
  let db = new DB();
  db.populateTables(film);
}

const addUniqueElement = (chars, char, log) => {
  if(!chars.includes(char)){
    chars.push(char);
  }
}
