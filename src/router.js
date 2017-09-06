import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
import MainPage from './routes/MainPage';
import User from './routes/User';
import Manger from './routes/Manger';
import Log from './routes/Log';
import Outer from './routes/Outer';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path='/' component={Outer}>
      <Route path="/" component={IndexPage} />
      <Route path="/login" component={Login} />
      <Route path="/main" component={MainPage} />
      <Route path="/user" component={User} />
      <Route path="/manger" component={Manger} />
      <Route path="/log" component={Log} />
    </Route>
    </Router>
  );
}

export default RouterConfig;
