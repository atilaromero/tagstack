import { call, put, takeEvery } from 'redux-saga/effects'

const MODULE = 'SOURCES'
export const types = {
  SELECT: MODULE + '/SELECT',
  LOAD_REQUEST: MODULE + '/LOAD_REQUEST',
  LOAD_SUCCESS: MODULE + '/LOAD_SUCCESS',
  LOAD_FAILURE: MODULE + '/LOAD_FAILURE',
}

export const initialState = {
  selected: null,
  list: [],
  isLoading: false,
  error: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case types.SELECT:
    return { ...state, selected: action.item }

  case types.LOAD_REQUEST:
    return { ...state, isLoading: true, error: null }

  case types.LOAD_SUCCESS:
    return { ...state, isLoading: false, list: action.data}

  case types.LOAD_FAILURE:
    return { ...state, isLoading: false, error: action.error }

  default:
    return state
  }
}

export const actions = {
  update: () => ({ type: types.LOAD_REQUEST }),
  select: (item) => ({ type: types.SELECT, item}),
}

export const selectors = {}

export const saga = ({fetchSources}) => function* (dispatch, getState)  {
  yield takeEvery(types.LOAD_REQUEST, function* () {
    try {
      const data = yield call(fetchSources)
      yield put({type: types.LOAD_SUCCESS, data})
      const state = getState()
      if (!state.sources.selected && state.sources.list) {
        yield put({type: types.SELECT, item:state.sources.list[0]})
      }
    } catch (error) {
      yield put({type: types.LOAD_FAILURE, error})
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
