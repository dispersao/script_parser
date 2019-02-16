import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const SequenceFilter = ({items, itemsSelected, onChangeIds, name}) => {
  return (
    <div className="FilterContainer">
      <h3 className="FilterTitle">{name}</h3>
        <Select
         isMulti = 'true'
         value={itemToOption(itemsSelected)}
         onChange={els => onChangeIds(els.map(el => el.value))}
         options={itemToOption(items)}
       />
    </div>
  )
}
const itemToOption = (items) => {
  if(items){
    return Object.keys(items).map(item => ({label: items[item].name, value: items[item].id}))
  }
}
export default SequenceFilter
