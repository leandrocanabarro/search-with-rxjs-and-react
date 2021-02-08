import * as React from 'react';

import { Router } from 'react-router-dom';

import Routes from '~/Routes';
import history from '~/Services/History';

import './tailwind.output.css';

export default function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}
