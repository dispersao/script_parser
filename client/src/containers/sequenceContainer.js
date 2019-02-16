import {connect} from 'react-redux'
import Sequence from '../components/sequence'

const mapStateToProps = (state, ownProps) => {
  const data = state.sequenceData.entities;
  const sequence = data.sequences[ownProps.sequenceId] || {}
  const characters = [...new Set([].concat(...sequence.parts.map(p => data.parts[p].characters)))]
  const parts = sequence.parts.sort((a, b) => {
    const pa = data.parts[a]
    const pb = data.parts[b]
    if(pa.index === pb.index) return 0
    return data.parts[a].index < data.parts[b].index ? -1 : 1
  })
  return {
    type: data.types[sequence.type].name ,
    location: data.locations[sequence.location].name,
    reducedView: true,
    id: sequence.id,
    characters,
    parts
  }
}

export default connect(
  mapStateToProps,
  null
)(Sequence)
