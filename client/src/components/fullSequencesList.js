import React, {Component} from 'react'
import SequencesList from './sequencesList'
import SequenceFilters from './sequenceFilters'
import {connect} from 'react-redux'
import {fetchSequencesifNeeded} from '../actions'
import {getFilteredSequences} from '../selectors'
import {toJS} from '../utils/immutableToJS'


class FullSequencesList extends Component{
  componentDidMount(){
    this.props.fetchSequences()
  }
  render(){
    return (
      <div className="ScreenplayContainer">
        <SequenceFilters />
        <SequencesList sequences={this.props.sequences} reduced={true}></SequencesList>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  sequences: getFilteredSequences(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSequences: ()=> dispatch(fetchSequencesifNeeded())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(FullSequencesList))
