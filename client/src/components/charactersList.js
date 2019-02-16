import React from 'react'
import Character from '../containers/characterContainer'

const CharactersList = ({characters})=>(
  <div className="charactersList light">
    {characters.map((val,index)=>(
      <Character key={index} characterId={val}></Character>
    ))}
  </div>
)

export default CharactersList
