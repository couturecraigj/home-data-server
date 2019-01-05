import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Weather from './Weather';
import Welcome from './Welcome';
import Dashboard from './Dashboard';
import IncorrectRoute from './404';

const Routes = () => (
  <Switch>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/" exact component={Home} />
    <Route path="/weather" exact component={Weather} />
    <Route path="/welcome" exact component={Welcome} />
    <Route component={IncorrectRoute} />
  </Switch>
);

export default Routes;
