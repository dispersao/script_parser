import {connect} from 'react-redux'
import fullSequencesList from '../components/fullSequencesList'
import {fetchSequencesifNeeded} from '../actions'

const mapStateToProps = (state, ownProps) => {
  const sequences = state.sequenceData.entities.sequences || {}
  return{ sequences }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSequences: ()=> dispatch(fetchSequencesifNeeded())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(fullSequencesList)
