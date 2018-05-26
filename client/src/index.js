import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'd3/dist/d3.min.js'
import 'c3/c3.min.js'
import 'c3/c3.min.css'

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path='' component={App}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))


// registerServiceWorker();
