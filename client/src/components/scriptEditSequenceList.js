import React from 'react'
import Sequence from './sequence'
import DropSequenceArea from './dropSequenceArea'
// import ScriptEditSequence from './draggableSequence'

const ScriptEditSequenceList = ({sequences}) =>{
  return(
    <div className="Screenplay reduced">
      {sequences && sequences.map((seq, index)=>(
        <div>
          <DropSequenceArea index={index}></DropSequenceArea>
          <Sequence key={index} {...seq}></Sequence>
        </div>
      ))}
      <DropSequenceArea index={sequences.length}></DropSequenceArea>
    </div>
  )
}

export default ScriptEditSequenceList
