import React from 'react'
import {Jumbotron, Badge} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ScriptName from './scriptName'

const ScriptHeader = ({name, author, id }) => {
  return (
    <Jumbotron className="ScriptHeaderView">
      <ScriptName name={name} id={id} edit={true} />
      <div>{author}</div>
      <Link to="edit">Edit</Link>
    </Jumbotron>
  )
}

export default ScriptHeader
