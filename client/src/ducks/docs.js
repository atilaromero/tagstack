import { call, put, takeEvery } from 'redux-saga/effects'

const MODULE = 'DOCS'
export const types = {
  LOAD_REQUEST: MODULE + '/LOAD_REQUEST',
  LOAD_SUCCESS: MODULE + '/LOAD_SUCCESS',
  LOAD_FAILURE: MODULE + '/LOAD_FAILURE',
}

export const initialState = {
  data: [],
  isLoading: false,
  error: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case types.LOAD_REQUEST:
    return { ...state, isLoading: true, error: null}

  case types.LOAD_SUCCESS:
    return { ...state, isLoading: false, data: action.data}

  case types.LOAD_FAILURE:
    return { ...state, isLoading: false, error: action.error }

  default:
    return state
  }
}

export const actions = {
  update: () => ({ type: types.LOAD_REQUEST}),
}

export const selectors = {}

export const saga = ({fetchDocs}) => function* (dispatch, getState)  {
  yield takeEvery(types.LOAD_REQUEST, function* () {
    try {
      const state = yield getState()
      const data = yield call(() => fetchDocs(state.search.data))
      yield put({type: types.LOAD_SUCCESS, data})
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
