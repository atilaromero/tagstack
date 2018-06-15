import { combineReducers } from 'redux';
import sources from './sources';
import search from './search';

export const reducer = combineReducers({
  sources: sources.reducer,
  search: search.reducer,
});
