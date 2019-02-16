import {connect} from 'react-redux'
import SequenceFilter from '../components/sequenceFilter'
import {setFilterIds, fetchEntityIfNeeded} from '../actions'


const mapStateToProps = (state, ownProps) => {
  const data = state.sequenceData.entities[ownProps.name] || []
  const selecteditems = state.sequenceFilters[ownProps.name].ids.map(id => data[id])
  return ({
    itemsSelected: selecteditems, // get element from state by id. normalize?
    items: data
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeIds: (ids)=>{
    dispatch(setFilterIds(ownProps.name, ids))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SequenceFilter)
