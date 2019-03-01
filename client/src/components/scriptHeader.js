import React from 'react'

const ScriptHeader = ({name, author }) => {

  return (
    <div className="ScriptHeaderView">
      <h3>{name}</h3>
      <div className="ScriptHeaderViewAuthorContainer">
        <span>author </span>
        <span className="label label-default">{author}</span>
      </div>
    </div>
  )
}

export default ScriptHeader
