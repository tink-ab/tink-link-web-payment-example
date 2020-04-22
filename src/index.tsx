import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import Demostore from './components/DemoStore';
import TinkLinkCallback from './components/TinkLinkCallback';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/callback">
        <TinkLinkCallback />
      </Route>
      <Route path="/">
        <Demostore />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
