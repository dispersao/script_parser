import React from 'react'
import {connect} from 'react-redux'
import {setFilterIds} from '../actions'
import {getEntryItems, getSequenceFilters} from '../selectors'

import Select from 'react-select'

const SequenceFilter = ({name, filter, items, onChangeIds}) => {
  return (
    <div className="FilterContainer">
      <h3 className="FilterTitle">{name}</h3>
        <Select
         isMulti = 'true'
         value={idsToOption(filter.get('ids'))}
         onChange={els => onChangeIds(els.map(el => el.value))}
         options={itemToOption(items)}
       />
    </div>
  )
}

const idsToOption = (ids) => {
  if(ids){
    return ids.map(id => itemToOption(id))
  }
}

const itemToOption = (items) => {
  if(items){
    return items.valueSeq().toArray().map(item => ({label: item.get('name'), value: item.get('id')}))
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    items: getEntryItems(state, ownProps.name),
    filter: getSequenceFilters(state)
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
