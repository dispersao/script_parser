import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select';


const SequenceFilter = (props) => (
  <div className="FilterContainer">
    <h3 className="FilterTitle">{props.name}</h3>
      <Select
       isMulti = 'true'
       value={props.itemsSelected}
       onChange={els => props.onChangeIds(els)}
       options={props.items}
     />
  </div>
)

SequenceFilter.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  itemsSelected: PropTypes.array.isRequired,
  onChangeIds: PropTypes.func.isRequired
}

export default SequenceFilter
