import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import './App.css';

import Login from './components/Login/Login';
import Packages from './components/Pages/Packages'

function App() {
  const [token, setToken] = useState();

  if(!token)
  {
    return <Login setToken = {setToken}/>
  }
  return (
    <Router>
      <Switch>
        <Route path = "/packages">
          <Packages/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
