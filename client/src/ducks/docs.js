import { call, put, takeEvery } from 'redux-saga/effects'

const data = require('../data.json').data.map(l => {
  ['atime', 'mtime', 'ctime', 'crtime'].forEach(x => {
    if (l[x] === 0) {
      l[x] = null
    } else {
      l[x] = l[x] * 1000
    }
  })
  return l
})
const fields = require('../data.json').meta.fields

const MODULE = 'DOCS'
export const types = {
  SELECT: MODULE + '/SELECT',
  UNSELECT: MODULE + '/UNSELECT',
  CLEAR: MODULE + '/CLEAR',
  LOAD_REQUEST: MODULE + '/LOAD_REQUEST',
  LOAD_SUCCESS: MODULE + '/LOAD_SUCCESS',
  LOAD_FAILURE: MODULE + '/LOAD_FAILURE',
}


export const initialState = {
  data,
  fields,
  selection: [],
  isLoading: false,
  error: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case types.SELECT:
    return { ...state, selection: state.selection.concat([action.data]) }

  case types.UNSELECT:
    return { ...state, selection: state.selection.filter(x => x!==action.data)}

  case types.CLEAR:
    return { ...state, selection: []}

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
  select: x => ({ type: types.SELECT, data: x }),
  unselect: x => ({ type: types.UNSELECT, data: x }),
  clear: () => ({ type: types.CLEAR }),
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
