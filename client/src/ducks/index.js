import { combineReducers } from 'redux';
import sources from './sources';
import search from './search';
import docs from './docs';

export const reducer = combineReducers({
  sources: sources.reducer,
  search: search.reducer,
  docs: docs.reducer,
});
