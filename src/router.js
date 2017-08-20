import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
import MainPage from './routes/MainPage';
import User from './routes/User';
import Manger from './routes/Manger';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/login" component={Login} />
      <Route path="/main" component={MainPage} />
      <Route path="/user" component={User} />
      <Route path="/manger" component={Manger} />
    </Router>
  );
}

export default RouterConfig;
