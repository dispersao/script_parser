import React from 'react'
import SequenceCharacter from './sequenceCharacter'

const CharactersList = ({characters})=>(
  <div className="charactersList light">
    {characters.map((val,index)=>(
      <SequenceCharacter key={index} character={val}></SequenceCharacter>
    ))}
  </div>
)

export default CharactersList
