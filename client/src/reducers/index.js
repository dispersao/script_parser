import {combineReducers} from 'redux'
import {
  SET_FILTER_IDS,
  SET_FILTER_EXCLUDE,
  SET_FILTER_AND,
  REQUEST_ENTITY,
  RECEIVE_ENTITY
} from '../actions'

const createDefaultFilter = ()=> ({
  ids:[],
  exclude:false
})

const entitiesDefault = {
  characters: [],
  types: [],
  locations: []
}

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

const entities = (state = {
  isFetching: false,
  items:[]
}, action)=> {
  switch (action.type){
    case REQUEST_ENTITY:
      return {
        ...state,
        isFetching:true
      }
    case RECEIVE_ENTITY:
      return {
        ...state,
        isFetching:false,
        items: action.items
      }
    default:
      return state
  }
}

const entitiesByName = (state = entitiesDefault, action) => {
  switch (action.type) {
    case RECEIVE_ENTITY:
    case REQUEST_ENTITY:
    return {
      ...state,
      [action.name]: entities(state[action.name], action)
    }
    default:
    return state
  }
}

export default combineReducers({
  sequenceFilters,
  entitiesByName
})
