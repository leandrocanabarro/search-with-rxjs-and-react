import * as React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '~/Pages/Home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/" component={() => <h1>404</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
