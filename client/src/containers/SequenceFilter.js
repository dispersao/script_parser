import {connect} from 'react-redux'
import SeqFilter from '../components/sequenceFilter'
import {setFilterIds} from '../actions'

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return ({
    itemsSelected: state.sequenceFilters[ownProps.name].ids,
    // itemsSelected: [],
    // items: []
    items: (state.entitiesByName[ownProps.name] && state.entitiesByName[ownProps.name].items) || []
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
)(SeqFilter)
