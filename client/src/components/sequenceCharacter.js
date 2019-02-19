import React from 'react'

const Character = ({id, name})=> {
  const charaStyle = (Number(id) -1)%6;
  const styles = ["primary", "default", "success", "info", "warning", "danger"];
  return <span key={id} className={`label label-${styles[charaStyle]} m5`}>{name}</span>
}
 export default Character
