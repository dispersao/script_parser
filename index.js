const fountain = require('./fountain-master/index');
const fs = require('fs');
const mysql = require('mysql');
const DB = require('./store')


fs.readFile('dispersao_v2.fountain', 'utf-8', (err, data) => {
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
    const scenes = [];
    const characters = [];
    const types = [];
    const locations = [];
    // const scenes = [];
    let scene;
    output.tokens.forEach(token =>{
      if(token.type === 'scene_heading'){
        scene = {characters:[], content:'', actions:[]};
        const type_location = token.text.split('-');
        scene.type = type_location[0];
        scene.location = type_location[1];

        addUniqueElement(types, scene.type);
        addUniqueElement(locations, scene.location);

        scene.id = token.scene_number;
        scenes.push(scene);
      } else if(scene){
        if(token.type === 'dialogue_begin'){
          // scene.content+= '<br />';
        } else if(token.type === 'character'){
          const char = token.text;
          addUniqueElement(scene.characters, char);
          addUniqueElement(characters, char);
        } else if(token.type === 'action'){
          const action = token.text;
          scene.actions.push(action);
        }
        if(token.text != undefined){
          scene.content+= token.text + '<br />';
        }
      }
    });
    // console.log(scenes);
    return {scenes: scenes, characters: characters, types: types, locations: locations};
}

const includeNonDialogueCharsToScenes = (film) => {
  film.scenes.forEach(scene => {
    const actions = scene.actions.join(' ');
    film.characters.forEach(char => {
      const reg = new RegExp(char, 'gmi');
      if(actions.match(reg)){
        addUniqueElement(scene.characters, char, true);
      }
    });
  });
}

const store= (film) => {
  let db = new DB();
  db.createTables(film);
}

const addUniqueElement = (chars, char, log) => {
  if(!chars.includes(char)){
    chars.push(char);
  }
}
