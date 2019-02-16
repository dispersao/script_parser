import React from 'react'
import CharactersList from './charactersList'
import PartsList from './partsList'
// import Part from './part';
// import _ from 'lodash';

const Sequence = ({type, location, reducedView, id, characters, parts}) => {
  let clas= "SequenceContainer";
  if(reducedView){
    clas += " reduced";
  }
  return (
    <div className={clas}>
      <h3 className="SequenceTitle">{type} - {location} <span className="light">#{id}</span></h3>
      {characters && characters.length > 0 &&
        <div className="charactersList light">
          <CharactersList characters={characters} />
        </div>
      }
      <div className="partsContanier">
        <PartsList parts={parts} />
      </div>
    </div>
  )
}

export default Sequence;
