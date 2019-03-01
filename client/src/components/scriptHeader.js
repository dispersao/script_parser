import React from 'react'
import {Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const ScriptHeader = ({name, author, id }) => {
  return (
    <Jumbotron className="ScriptHeaderView">
      <div className="content">
        <h3>{name}</h3>
        <div>{author}</div>
      </div>
      <Link to={`${id}/edit`}>Edit</Link>
    </Jumbotron>
  )
}

export default ScriptHeader
