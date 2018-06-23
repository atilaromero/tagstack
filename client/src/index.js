import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import { saga as sourcesSaga } from './ducks/sources';
import { saga as searchSaga } from './ducks/search';
import { saga as docsSaga } from './ducks/docs';
import { reducer } from './ducks';
import { fetchSources } from './services/sources'
import { fetchSearch } from './services/search'
import { fetchDocs } from './services/docs'

import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'd3/dist/d3.min.js'
import 'c3/c3.min.js'
import 'c3/c3.min.css'

const initialState = {};

const logger = createLogger({
  duration: true,
  level: 'log'
});

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(
    sagaMiddleware,
    // logger,
  )
)

const URL = ''
const ROUTES = {
  sources: URL + '/sources',
  search: URL + '/search',
  docs: URL + '/docs',
}

sagaMiddleware.run(sourcesSaga({
  fetchSources: fetchSources({url: ROUTES.sources}),
}), store.dispatch, store.getState)
sagaMiddleware.run(searchSaga({
  fetchSearch:  fetchSearch({url: ROUTES.search}),
}), store.dispatch, store.getState)
sagaMiddleware.run(docsSaga({
  fetchDocs:    fetchDocs({url: ROUTES.docs}),
}), store.dispatch, store.getState)



ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='' component={App}/>
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))


// registerServiceWorker();
