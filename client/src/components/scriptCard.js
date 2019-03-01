import React from 'react'


const ScriptCard = ({name, scriptSequences, id, author}) => {
  return (
    <div className="ScriptCardContainer">
      <h3 className="ScriptCardTile">{name}</h3>
      <div className="ScriptCardInfo">
        <div className="ScriptCardAuthorContainer">
          <span>author </span>
          <span className="label label-default">{author}</span>
        </div>
        <div className="ScriptCardSequenceCount">
          <span>{scriptSequences.length} {scriptSequences.length === 1 ? 'sequence' : 'sequences'}</span>
        </div>
      </div>
    </div>
  )
}

export default ScriptCard
