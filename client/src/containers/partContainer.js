import {connect} from 'react-redux'
import Part from '../components/part'

const mapStateToProps = (state, ownProps) => {
  const data = state.sequenceData.entities;
  const part = data.parts[ownProps.partId] || {}
  const characters = part.characters.map(c => data.characters[c].name)
  return {
    ...part,
    characters: characters
  }
}

export default connect(
  mapStateToProps,
  null
)(Part)
