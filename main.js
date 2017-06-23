import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Home from './Home.jsx';
import Detail from './Detail.jsx';
import { HashRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render((
  <HashRouter>
    <App>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/detail/:name' component={Detail} />
      </Switch>
    </App>
  </HashRouter>
), document.getElementById('app'))