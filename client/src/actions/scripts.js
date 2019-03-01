import { normalizeScriptData} from '../schema'
import {getScripts} from '../selectors'

export const REQUEST_SCRIPTS = 'REQUEST_SCRIPTS'
export const RECEIVE_SCRIPTS = 'RECEIVE_SCRIPTS'
export const SET_CURRENT_SCRIPT = 'SET_CURRENT_SCRIPT'


export const requestScripts = () => ({
  type: REQUEST_SCRIPTS
})

export const receiveScripts = (data) => {
  return ({
    type: RECEIVE_SCRIPTS,
    payload: data
  })
}

export const setCurrentScript = (id) => {
  return ({
    type: SET_CURRENT_SCRIPT,
    payload: id
  })
}

const shouldFetchScripts = (state) => {
  if(state.sequenceData.getIn(['loading', 'scripts'])){
    return false
  }
  if(!getScripts(state)){
    return true
  }
  return true
}

const fetchScripts = () => dispatch => {
  dispatch(requestScripts())
  return fetch(`/api/scripts`, {
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }})
  .then(res => res.json())
  .then(json => {
    console.log(normalizeScriptData(json))
    return dispatch(receiveScripts(normalizeScriptData(json)))
  })
}

export const fetchScriptsIfNeeded = name => (dispatch, getState) =>{
  if(shouldFetchScripts(getState())){
    return dispatch(fetchScripts())
  }
}
