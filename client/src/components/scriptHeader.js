import React from 'react'
import {Jumbotron, Badge} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ScriptName from './scriptName'
import ScriptAuthor from './scriptAuthor'

const ScriptHeader = ({name, author, id }) => {
  return (
    <Jumbotron className="ScriptHeaderView">
      <ScriptName name={name} id={id}  />
      <ScriptAuthor author={author} id={id} />
    </Jumbotron>
  )
}

export default ScriptHeader
