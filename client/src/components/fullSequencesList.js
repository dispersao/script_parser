import React, {Component} from 'react'
import SequencesList from './sequencesList'

class FullSequencesList extends Component{
  componentDidMount(){
    this.props.fetchSequences()
  }
  render(){
    return (
      <div className="ScreenplayContainer">
        <SequencesList sequences={this.props.sequences}></SequencesList>
      </div>
    )
  }
}

export default FullSequencesList
