export const SET_FILTER_IDS = 'SET_FILTER_IDS'
export const SET_FILTER_EXCLUDE = 'SET_FILTER_EXCLUDE'
export const SET_FILTER_AND = 'SET_FILTER_AND'
export const REQUEST_ENTITY = 'REQUEST_ENTITY'
export const RECEIVE_ENTITY = 'RECEIVE_ENTITY'

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

export const requestEntity = name => ({
  type: REQUEST_ENTITY,
  name
})

export const receiveEntity = (name, json) => ({
  type: RECEIVE_ENTITY,
  name,
  items: json.data.children.map(child => child.data),
  receiveAt: Date.now
})

const fetchEntity = name => dispatch => {
  dispatch(requestEntity(name))
  return fetch(`/api/${name}`)
  .then(res => res.json())
  .then(json => dispatch(receiveEntity(name, json)))
}

const shouldFetchEntity = (state, name) => {
  const entityList = state.entityListByName[name]
  if(!entityList){
    return true
  }
  if(entityList.isFetching){
    return false
  }
  return true
}

export const fetchEntityIfNeeded = name => (dispatch, getState) =>{
  if(shouldFetchEntity(getState(), name)){
    return dispatch(fetchEntity(name))
  }
}
