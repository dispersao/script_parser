import { fromJS } from 'immutable'

import {
  REQUEST_SCRIPTS,
  RECEIVE_SCRIPTS,
  SET_CURRENT_SCRIPT
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
    default:
      return state
  }
}

export default reducer
