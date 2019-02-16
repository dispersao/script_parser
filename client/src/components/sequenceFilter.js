import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select';
import {fetchEntityIfNeeded} from '../actions'


class SequenceFilter extends Component{
  static propTypes = {
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    itemsSelected: PropTypes.array.isRequired,
    onChangeIds: PropTypes.func.isRequired,
    fetchEntities: PropTypes.func.isRequired
  }
  componentDidMount(){
    // this.props.fetchEntities()
  }

  render(){
    return(
      <div className="FilterContainer">
        <h3 className="FilterTitle">{this.props.name}</h3>
          <Select
           isMulti = 'true'
           value={this.props.itemsSelected}
           onChange={els => this.props.onChangeIds(els)}
           options={this.props.items}
         />
      </div>
    )
  }
}
export default SequenceFilter
