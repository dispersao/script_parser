import {combineReducers} from 'redux'
import { fromJS, List, Map } from 'immutable'

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

const initialFilterState = fromJS(filtersDefault);

const sequenceFilters = (state = initialFilterState, action) => {
  switch(action.type){
    case SET_FILTER_IDS:
      const idsList = List(action.payload.value)
      return state.setIn([action.payload.name, action.payload.field], idsList)
    case SET_FILTER_EXCLUDE:
    case SET_FILTER_AND:
      return state.mergeDeep({
        [action.payload.name]: {
          [action.payload.field]: action.payload.value
        }
      })
    default:
      return state
  }
}

const initialSequencesState = fromJS({entities: {}, loading: false});

const sequenceData = (state = initialSequencesState, action) => {
  switch (action.type){
    case REQUEST_SEQUENCES:
      return state.set('loading', true)
    case RECEIVE_SEQUENCES:
      let newState = state.set('loading', false)
      return newState.mergeDeep(fromJS(action.payload))
    default:
      return state
  }
}

export default combineReducers({
  sequenceFilters,
  sequenceData
})
