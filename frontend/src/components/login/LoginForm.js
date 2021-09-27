import React, { Component } from "react";
import axios from "axios";

class LoginForm extends Component {
  _isMounted = false;

  constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.props = props;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ 
      username: "", 
      password: "", 
    });
  }

  async postUsers() {
    const url = "http://localhost:3001/users";
    await axios
            .post(
              url, 
              {username: this.state.username,
              password: this.state.password})
            .then((response) => {
              this.props.onLogin({
                username: this.state.username,
                isLoggedIn: true,  
                isAdmin: response.data.isAdmin
              });
              alert('Login successfully: ' + this.state.username);
              this.setState({ 
                username: "", 
                password: "", 
              });
            })
            .catch(error => {
              this.props.onLogin({ 
                isLoggedIn: false,  
                isAdmin: false 
              });
              this.setState({ 
                username: "", 
                password: "", 
              });
              alert('Login error');
              console.error(
                'There was an error!', error
              );
            });
  }

  handleChange(event) {
    if (this._isMounted)
      this.setState({ 
        [event.target.name]: event.target.value 
      });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this._isMounted) await this.postUsers();
  }

  render() {
    return (
      <div id='login-screen' className="form">
        <form id='login-form' onSubmit={this.handleSubmit}>
          <div className="form-row">
            <label 
              htmlFor="username" 
              className="form-label"
            >
              Username: 
            </label>
            <input 
              type="text"
              value={this.state.username}
              onChange={this.handleChange} 
              id="usernameID" 
              name="username" 
              required 
            />
          </div>
          <div className="form-row">
            <label 
              htmlFor="password" 
              className="form-label"
            >
              Password: 
            </label>
            <input 
              onChange={this.handleChange}
              value={this.state.password}
              type="password" 
              id="passwordID" 
              name="password" 
              required />
          </div>
          <button 
            type="submit" 
            id="login-button"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;