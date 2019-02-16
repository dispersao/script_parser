import React, {Component} from 'react'
import SequencesList from './sequencesList'
import SequenceFilters from './sequenceFilters'

class FullSequencesList extends Component{
  componentDidMount(){
    this.props.fetchSequences()
  }
  render(){
    return (
      <div className="ScreenplayContainer">
        <SequenceFilters />
        <SequencesList sequences={this.props.sequences}></SequencesList>
      </div>
    )
  }
}

export default FullSequencesList
