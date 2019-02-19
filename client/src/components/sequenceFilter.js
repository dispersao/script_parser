import React from 'react'
import {List} from 'immutable'
import {connect} from 'react-redux'
import {setFilterIds, setFilterExclude} from '../actions'
import {getEntryItems, getSequenceFilters} from '../selectors'

import Select from 'react-select'

const SequenceFilter = ({name, filter, items, onChangeIds, onChangeExclude}) => {
  return (
    <div className="FilterContainer">
      <h3 className="FilterTitle">{name}</h3>
        <Select
         isMulti = 'true'
         value={idsToOption(items, filter.get('ids'))}
         onChange={els => onChangeIds(els.map(el => el.value))}
         options={itemsToOptions(items)}
       />
    </div>
  )
}

const idsToOption = (items, ids) => {
  if(ids && ids.size){
    return ids.map(id => {
       return itemToOption(items.get(id.toString()))
    }).toArray()
  }
}

const itemsToOptions = (items) => {
  if(items && items.size){
    return items.map(itemToOption).toArray()
  }
}

const itemToOption = (item) => ({
  label: item.get('name'),
  value: item.get('id')
})

const mapStateToProps = (state, ownProps) => {
  return ({
    items: getEntryItems(state, ownProps.name),
    filter: getSequenceFilters(state).get(ownProps.name)
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeIds: (ids)=>{
    dispatch(setFilterIds(ownProps.name, ids))
  },
  onChangeExclude: (exclude) =>{
    dispatch(setFilterExclude(ownProps.name, exclude))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SequenceFilter)
