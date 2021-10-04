import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import './App.css';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import CreatePackage from './components/CreatePackage/CreatePackage';
import useToken from './components/App/useToken';
import EditPackage from './components/EditPackage/EditPackage';

function App() {

  const {token, setToken} = useToken();

  if(!token)
  {
    return <Login setToken = {setToken}/>
  }
  return (
    <Router>
      <Switch>
        <Route exact path= "/home">
          <Home 
            token = {token}
            setToken = {setToken}
          />
        </Route>
        <Route path = "/createPackage">
          <CreatePackage 
            setToken = {setToken}
            token = {token}
          />
        </Route>
        <Route path = "/editPackage">
          <EditPackage 
            setToken = {setToken}
            token = {token}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
