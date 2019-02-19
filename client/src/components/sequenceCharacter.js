import React from 'react'

const Character = ({character})=> {
  const charaStyle = (Number(character.get('id')) -1)%6;
  const styles = ["primary", "default", "success", "info", "warning", "danger"];
  return <span key={character.get('id')} className={`label label-${styles[charaStyle]} m5`}>{character.get('name')}</span>
}
 export default Character
