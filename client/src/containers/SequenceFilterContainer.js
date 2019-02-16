import {connect} from 'react-redux'
import SequenceFilter from '../components/SequenceFilter'
import {setFilterIds, fetchEntityIfNeeded} from '../actions'

const itemToOption = (items) => {
  if(items){
    return items.map(item => ({label: item.name, value: item.id}))
  }
}

const optionsToItem = (options) => {
  if(options){
    return options.map(option => ({id: option.value, name: option.label}))
  }
}

const mapStateToProps = (state, ownProps) => {
  const items = state[ownProps.name].items
  const selecteditems = state.sequenceFilters[ownProps.name].ids.map(id => state[ownProps.name].items.find(item => item.id === id))
  return ({
    itemsSelected: itemToOption(selecteditems) || [], // get element from state by id. normalize?
    items: itemToOption(items) || []
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeIds: (options)=>{
    dispatch(setFilterIds(ownProps.name, options.map(option => option.value)))
  },
  fetchEntities: ()=>{
    dispatch(fetchEntityIfNeeded(ownProps.name))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SequenceFilter)
