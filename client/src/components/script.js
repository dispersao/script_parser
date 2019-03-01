import React, {Component} from 'react'
import FullSequencesList from './fullSequencesList'
import ScriptHeader from './scriptHeader'
import SequencesList from './sequencesList'
import {connect} from 'react-redux'
import {toJS} from '../utils/immutableToJS'
import {fetchScriptsIfNeeded, fetchSequencesifNeeded} from '../actions'
import {makeGetScriptFormatted} from '../selectors'

import '../app.css'

class Script extends Component {
  componentDidMount(){
    this.props.fetchScripts()
    this.props.fetchSequences()
  }
  render(){
    return (
      <div className="scriptEditor">
        <ScriptHeader {...this.props.script} />
        <div className="scriptEditorSequencesContainer">
          <section className="sequencePicker">
            <FullSequencesList />
          </section>
          <section className="scriptContainer">
            {this.props.script && this.props.script.sequences.length &&
              <SequencesList sequences={this.props.script.sequences} />
            }
          </section>
        </div>
      </div>
    )
  }
}

const makeMapStateToProps = () => {
  const getScriptFormatted = makeGetScriptFormatted()

  const mapStateToProps = (state, props) => {
    let script
      if(props.match.params.id) {
        script = getScriptFormatted(state, {id: props.match.params.id})
      } else {
        script = {sequences:[], name:'',author:''}
      }
    return {
      script: script
    }
  }
  return mapStateToProps
}

// const mapStateToProps = (state, ownProps) => {
//   let script
//   if(ownProps.match.props.id) {
//     script = getScripts(state).get(ownProps.match.props.id)
//   } else {
//     script =
//   }
//   return{
//     script:script
//   }
// }

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchScripts: ()=>dispatch(fetchScriptsIfNeeded()),
  fetchSequences: ()=>dispatch(fetchSequencesifNeeded())
})

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(toJS(Script))
