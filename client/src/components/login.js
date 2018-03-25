import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForgot: false,
    }
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleLogin() {
    console.log("EMail: " + this.state.email);
    console.log("Password: " + this.state.password);
    let apiHost = app.apiHost || '/'
    axios.post(`${apiHost}login`, {
        email: this.state.email,
        password: this.state.password
      }, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .then(function (response) {
        //console.log(response);
        window.location.reload()
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  handleForgotEmailChange(e) {
    this.setState({ forgotEmail: e.target.value });
  }
  handleForgot() {
    console.log("ForgotEMail: " + this.state.forgotEmail);
    let apiHost = app.apiHost || '/'
    axios.post(`${apiHost}forgot`, { email: this.state.forgotEmail },
      { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .then(function (response) {
        //console.log(response);
        //window.location.reload()
      })
      .catch(function (error) {
        //console.log(error);
      });
  }
  toggleForgot(e) {
    e.stopPropagation();
    this.setState({ showForgot: !this.state.showForgot });
  }

  render () {
    return (
      <div style={{ margin: 10 }} className="text-center">
        {!this.state.showForgot ? (
          <div method="post" action="login">
            <div className="mb-2">
              <input className="email form-control" name="email" type="text" placeholder="Email" onChange={this.handleEmailChange.bind(this)} />
            </div>
            <div className="mb-2">
              <input className="pass form-control" name="password" type="password" placeholder="Password" onChange={this.handlePasswordChange.bind(this)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={this.handleLogin.bind(this)}>Log In / Sign Up</button>
            <a className="text-center text-dark" href="#" onClick={this.toggleForgot.bind(this)}><u>Forgot account?</u></a>
          </div>
        ) : (
          <div method="post" action="forgot">
            <div className="mb-2">Please enter your email.</div>
            <div className="mb-2">
                <input className="email form-control" name="email" type="text" placeholder="Email" onChange={this.handleForgotEmailChange.bind(this)} />
            </div>
            <div className="btn-block text-left clearfix">
              <button type="submit" className="btn btn-primary" onClick={this.handleForgot.bind(this)}>Forgot</button>
              <button type="submit" className="btn btn-secondary float-right" onClick={this.toggleForgot.bind(this)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
