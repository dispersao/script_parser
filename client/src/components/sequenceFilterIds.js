import React from 'react'
import Select from 'react-select'

const SequenceFilterIds = ({filter, items, onChangeIds}) => {
  return (
      <Select
       isMulti = 'true'
       value={idsToOption(items, filter.get('ids'))}
       onChange={els => onChangeIds(els.map(el => el.value))}
       options={itemsToOptions(items)}
     />
  )
}
export default SequenceFilterIds

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
