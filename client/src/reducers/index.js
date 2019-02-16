import {combineReducers} from 'redux'

import {
  SET_FILTER_IDS,
  SET_FILTER_EXCLUDE,
  SET_FILTER_AND,
  REQUEST_SEQUENCES,
  RECEIVE_SEQUENCES,
} from '../actions'

const createDefaultFilter = ()=> ({
  ids:[],
  exclude:false
})

const filtersDefault = {
  characters:{
    ...createDefaultFilter(),
    and: true
  },
  types: createDefaultFilter(),
  locations: createDefaultFilter()
}


const setSequenceFilter = (state, {ids, and, exclude}) => {
  return Object.assign({}, state, {
    ids,
    and,
    exclude
  })
}

const sequenceFilters = (state = filtersDefault, action) => {
  switch(action.type){
    case SET_FILTER_IDS:
    case SET_FILTER_EXCLUDE:
    case SET_FILTER_AND:
    return {
      ...state,
      [action.name]: setSequenceFilter(state[action.name], action)
      }
    default:
      return state
  }
}


const sequenceData = (state = {entities: {}, loading: false}, action) => {
  switch (action.type){
    case REQUEST_SEQUENCES:
      return { ...state, loading: true }
    case RECEIVE_SEQUENCES:
      return { ...state, entities: action.entities, loading: false }
    default:
      return state
  }
}

export default combineReducers({
  sequenceFilters,
  sequenceData
})
