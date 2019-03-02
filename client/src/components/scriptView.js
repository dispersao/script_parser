import React, {Component} from 'react'
import FullSequencesList from './fullSequencesList'
import ScriptHeader from './scriptHeader'
import SequencesList from './sequencesList'
import {connect} from 'react-redux'
import {toJS} from '../utils/immutableToJS'
import {fetchScriptsIfNeeded, fetchSequencesifNeeded, setCurrentScriptId} from '../actions'
import {getCurrentScriptFormatted} from '../selectors'
import {Link} from 'react-router-dom'
import {Nav} from 'react-bootstrap'


import '../app.css'

class ScriptView extends Component {
  componentDidMount(){
    this.props.fetchScripts()
    this.props.fetchSequences()
    this.props.setScript()
  }
  render(){
    return (
      <div className="scriptView">
        <Nav>
          <Link to="/">Home</Link>
        </Nav>
        {this.props.script &&
          <div>
            <ScriptHeader {...this.props.script} />
            <div className="scriptEditorSequencesContainer">
              {/*<section className="sequencePicker">
                <FullSequencesList />
              </section>*/}
              <section className="scriptContainer">
                {this.props.script && this.props.script.sequences.length &&
                  <SequencesList sequences={this.props.script.sequences} reduced={false} />
                }
              </section>
            </div>
          </div>
        }
      </div>
    )
  }
}

// const makeMapStateToProps = () => {
//   const getScriptFormatted = makeGetScriptFormatted()
//
//   const mapStateToProps = (state, props) => {
//     let script
//       if(props.match.params.id) {
//         script = getScriptFormatted(state, {id: props.match.params.id})
//       } else {
//         script = {sequences:[], name:'',author:''}
//       }
//     return {
//       script: script
//     }
//   }
//   return mapStateToProps
// }

const mapStateToProps= (state,props) => {
  return {
    script: getCurrentScriptFormatted(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchScripts: ()=>dispatch(fetchScriptsIfNeeded()),
  fetchSequences: ()=>dispatch(fetchSequencesifNeeded()),
  setScript: ()=>dispatch(setCurrentScriptId(ownProps.match.params.id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(ScriptView))
