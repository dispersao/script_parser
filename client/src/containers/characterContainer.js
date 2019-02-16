import React from 'react'
import {connect} from 'react-redux'

const Character = ({id, name})=> {
  const charaStyle = (id -1)%6;
  const styles = ["primary", "default", "success", "info", "warning", "danger"];
  return <span key={id} className={`label label-${styles[charaStyle]} m5`}>{name}</span>
}

const mapStateToProps = (state, ownProps) => {
  const character = state.sequenceData.entities.characters[ownProps.characterId] || {}
  return character
}

export default connect(
  mapStateToProps,
  null
)(Character)
