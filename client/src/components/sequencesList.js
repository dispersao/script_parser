import React from 'react'
import Sequence from './sequence'

const SequencesList = ({sequences}) =>{
  return(
    <div className="Screenplay">
      {sequences && sequences.map((seq, index)=>(
        <Sequence key={index} {...seq}></Sequence>
      ))}
    </div>
  )
}

export default SequencesList
