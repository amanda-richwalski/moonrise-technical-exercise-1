import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import AppBar from './Appbar';
import { Route, Switch} from "react-router-dom";
import UserForm from './UserForm';
import UserList from './UserList';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={UserForm} />
          <Route path="/list" component={UserList} />
        </Switch>
      </div>
    );
  }
}

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  )
}

export default App;
