import React, { Component } from 'react';
import './App.css';

import Login from "./components/login/Login";
import MainScreen from './components/main/MainScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '',  
                    isLoggedIn: false, 
                    isAdmin: false };
    this.onLogin = this.onLogin.bind(this);
    this.onClickLogoutButton = this.onClickLogoutButton.bind(this);
  }

  onLogin(response) {
    this.setState(response);
  }

  onClickLogoutButton() {
    this.setState({ username: '',  
                    isLoggedIn: false, 
                    isAdmin: false });
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn 
          ? <MainScreen 
              username={this.state.username}
              isAdmin={this.state.isAdmin}
              onClickLogoutButton={this.onClickLogoutButton}
            />
          : <Login onLogin={this.onLogin} />
        }
      </div>
    );
  }
}

export default App;
