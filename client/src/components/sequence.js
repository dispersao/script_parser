import React from 'react'
import SequenceCharactersList from './sequenceCharactersList'
import PartsList from './partsList'

const Sequence = ({sequence}) => {
  let clas= "SequenceContainer";
  if(true){
    clas += " reduced";
  }
  return (
    <div className={clas}>
      <h3 className="SequenceTitle">{sequence.getIn(['type', 'name'])} - {sequence.getIn(['location', 'name'])} <span className="light">#{sequence.get('id')}</span></h3>
      {sequence.get('characters') && sequence.get('characters').size > 0 &&
        <div className="charactersList light">
          <SequenceCharactersList characters={sequence.get('characters')} />
        </div>
      }
      <div className="partsContanier">
        <PartsList parts={sequence.get('parts')} />
      </div>
    </div>
  )
}

export default Sequence
