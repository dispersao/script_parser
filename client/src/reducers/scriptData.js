import { fromJS } from 'immutable'

import {
  REQUEST_SCRIPTS,
  RECEIVE_SCRIPTS,
  SET_CURRENT_SCRIPT,
  ADD_SEQUENCE_TO_SCRIPT
} from '../actions'

export const STATE_KEY = 'scriptData'

const initialScriptState = fromJS({loading: false, currentScript: null});

const reducer = (state = initialScriptState, action) => {
  switch (action.type){
    case SET_CURRENT_SCRIPT:
      return state.set('currentScript', action.payload)
    case REQUEST_SCRIPTS:
      return state.set( 'loading', true)
    case RECEIVE_SCRIPTS:
      let newState = state.set('loading', false)
      return newState.mergeDeep(fromJS(action.payload.entities))
    case ADD_SEQUENCE_TO_SCRIPT:
      return includeNewSequenceToScript(state, action.payload)
    default:
      return state
  }
}

function includeNewSequenceToScript (state, {index, sequence, script}) {
let id = Math.round(Math.random()*100000)
  let newScriptSequence = fromJS({
    [id]: {
      id: id,
      sequenceId: sequence,
      scriptId: parseInt(script)
    }
  })

  let scriptSequencesList = state.get('scriptSequences').merge(newScriptSequence)
  let newState = state.set('scriptSequences', scriptSequencesList)
  let seqList = newState.getIn(['scripts', script.toString(),'scriptSequences']).insert(index,id)
  newState = newState.setIn(['scripts', script.toString(),'scriptSequences'], seqList)
  return newState;
}

export default reducer
