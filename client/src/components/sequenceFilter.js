import React from 'react'
import {connect} from 'react-redux'
import {setFilterIds, setFilterExclude} from '../actions'
import {getEntryItems, getSequenceFilters} from '../selectors'
import SequenceFilterIds from './sequenceFilterIds'
import SequenceFilterBoolean from './sequenceFilterBoolean'


const SequenceFilter = (props) => {
  const filter = props.filter
  return (
    <div className="FilterContainer">
      <h3 className="FilterTitle">{props.name}</h3>
        <SequenceFilterIds {...props} />
        { filter.get('ids') && filter.get('ids').size > 0 &&
          <div className="btn-group">
            <SequenceFilterBoolean
              filter={props.filter}
              field="exclude"
              onChange={props.onChangeExclude} />
          </div>
        }
    </div>
  )
}

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
