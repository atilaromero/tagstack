import { call, put, takeEvery } from 'redux-saga/effects'

const MODULE = 'DOCS'
export const types = {
  LOAD_REQUEST: MODULE + '/LOAD_REQUEST',
  LOAD_SUCCESS: MODULE + '/LOAD_SUCCESS',
  LOAD_FAILURE: MODULE + '/LOAD_FAILURE',
}

const sampleIlsEM = `md5|file|st_ino|st_ls|st_uid|st_gid|st_size|st_atime|st_mtime|st_ctime|st_crtime
0|<cfreds_2015_data_leakage_rm1.E01--alive-2>|2|-/d---------|0|0|32768|0|0|0|0
0|<cfreds_2015_data_leakage_rm1.E01-Authorized USB-alive-2051>|2051|-/r--x--x--x|0|0|0|0|0|0|0
0|<cfreds_2015_data_leakage_rm1.E01-$ALLOC_BITMAP-alive-2052>|2052|-/r--x--x--x|0|0|15274|0|0|0|0
0|<cfreds_2015_data_leakage_rm1.E01-$UPCASE_TABLE-alive-2053>|2053|-/r--x--x--x|0|0|5836|0|0|0|0
0|<cfreds_2015_data_leakage_rm1.E01-Secret Project Data-dead-2054>|2054|-/drwxrwxrwx|0|0|32768|1427131940|1425068418|0|1427131941
0|<cfreds_2015_data_leakage_rm1.E01-RM#1-alive-2058>|2058|-/drwxrwxrwx|0|0|32768|1424026328|1424026298|0|1424026328
0|<cfreds_2015_data_leakage_rm1.E01-Secret Project Data-alive-3075>|3075|-/drwxrwxrwx|0|0|32768|1424026328|1424026298|0|1424026328
0|<cfreds_2015_data_leakage_rm1.E01-design-alive-4099>|4099|-/drwxrwxrwx|0|0|32768|1424026328|1424026298|0|1424026328
0|<cfreds_2015_data_leakage_rm1.E01-proposal-alive-4102>|4102|-/drwxrwxrwx|0|0|32768|1424026332|1424026298|0|1424026332`

const maybeNumber = x => {
  const n = Number(x)
  return (isNaN(n))? x : n
}

function ilsEMtoData (s) {
  const times = new Set(['st_atime', 'st_mtime', 'st_ctime', 'st_crtime', ])
  const h = s.split('\n').slice(0,1)[0].split('|')
  const data = s.split('\n').slice(1).map(x =>
    x.split('|')
  ).filter(l => (!!l))
    .map(l => {
      const j = {}
      l.forEach((x,i) => {
        j[h[i]] = maybeNumber(x)
        if (times.has(h[i])){
          j[h[i]] = j[h[i]] * 1000
          if (j[h[i]] === 0) {
            j[h[i]] = null
          // } else {
          //   j[h[i]] = new Date(j[h[i]] * 1000)
          //   j[h[i]] = j[h[i]].toISOString().split('T')[0]
          }
        }
      })
      return j
    })
  return data
}

const simpleSplit = (s) => {
  return s.split('\n').map(x => x.split('|'))
}

export const initialState = {
  data: ilsEMtoData(sampleIlsEM),
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
