import { call, put, takeEvery } from 'redux-saga/effects'

const MODULE = 'SEARCH'
export const types = {
  SET_QUERY: MODULE + '/SET_QUERY',
  LOAD_REQUEST: MODULE + '/LOAD_REQUEST',
  LOAD_SUCCESS: MODULE + '/LOAD_SUCCESS',
  LOAD_FAILURE: MODULE + '/LOAD_FAILURE',
}

export const initialState = {
  query: '',
  data: [],
  isLoading: false,
  error: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case types.SET_QUERY:
    return { ...state, query: action.query }

  case types.LOAD_REQUEST:
    return { ...state, isLoading: true, error: null }

  case types.LOAD_SUCCESS:
    return { ...state, isLoading: false, data: action.data}

  case types.LOAD_FAILURE:
    return { ...state, isLoading: false, error: action.error }

  default:
    return state
  }
}

export const actions = {
  update: () => ({ type: types.LOAD_REQUEST }),
  setQuery: (query) => ({ type: types.SET_QUERY, query}),
}

export const selectors = {}

export const saga = ({fetchSearch}) => function* (dispatch, getState)  {
  yield takeEvery(types.LOAD_REQUEST, function* () {
    try {
      const state = yield getState()
      console.log(1)
      const data = yield call(() => fetchSearch(state.sources.selected, state.search.query))
      console.log(2)
      yield put({type: types.LOAD_SUCCESS, data})
      console.log(3)
      yield put({type: 'DOCS/LOAD_REQUEST'})
    } catch (error) {
      yield put({type: types.LOAD_FAILURE, error: JSON.stringify(error)})
    }
  })
}

export default {
  types,
  initialState,
  reducer,
  actions,
  selectors,
  saga,
}
