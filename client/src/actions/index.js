import { normalize } from 'normalizr'
import {sequencesListSchema} from '../schema'

export const SET_FILTER_IDS = 'SET_FILTER_IDS'
export const SET_FILTER_EXCLUDE = 'SET_FILTER_EXCLUDE'
export const SET_FILTER_AND = 'SET_FILTER_AND'
export const REQUEST_SEQUENCES = 'REQUEST_SEQUENCES'
export const RECEIVE_SEQUENCES = 'RECEIVE_SEQUENCES'


export const setFilterIds = (name, ids) => ({
    type: SET_FILTER_IDS,
    name,
    ids
})

export const setFilterExclude = (name, exclude) => ({
    type: SET_FILTER_EXCLUDE,
    name,
    exclude
})

export const setFilterAnd = (name, and) => ({
    type: SET_FILTER_EXCLUDE,
    name,
    and
})

export const requestSequences = () => ({
  type: REQUEST_SEQUENCES
})

export const receiveSequences = (data) => {
  return ({
    type: RECEIVE_SEQUENCES,
    entities: data.entities
  })
}

const fetchSequences = () => dispatch => {
  dispatch(requestSequences())
  return fetch(`/api/sequences`)
  .then(res => res.json())
  .then(json => {
    return dispatch(receiveSequences(normalize(json, sequencesListSchema)))
  })
}

const shouldFetchSequences = (state) => {
  const seqList = state.sequences
  if(!seqList){
    return true
  }
  if(seqList.isFetching){
    return false
  }
  return true
}

export const fetchSequencesifNeeded = name => (dispatch, getState) =>{
  if(shouldFetchSequences(getState())){
    return dispatch(fetchSequences())
  }
}
