import React from 'react'
import Sequence from '../containers/sequenceContainer'

const SequencesList = ({sequences}) =>{
  return(
    <div className="Screenplay">
      {Object.keys(sequences).map((key,index)=>(
        <Sequence key={index} sequenceId={key}></Sequence>
      ))}
    </div>
  )
}

export default SequencesList
