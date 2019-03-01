import React from 'react'
import {Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const ScriptHeader = ({name, author }) => {
  return (
    <Jumbotron className="ScriptHeaderView">
      <h3>{name}</h3>
      <div className="ScriptHeaderViewAuthorContainer">
        <p className="">{author}</p>
      </div>
    </Jumbotron>
  )
}

export default ScriptHeader
