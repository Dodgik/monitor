import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Login = React.createClass({
  handleEmailChange: function (e) {
    this.setState({ email: e.target.value });
  },
  handlePasswordChange: function (e) {
    this.setState({ password: e.target.value });
  },
  render: function () {
    return (
      <div style={{ margin: 10 }} className="login" method="post" action="login">
        <div className="mb-2">
          <input className="email form-control" name="email" type="text" placeholder="Email" onChange={this.handleEmailChange} />
        </div>
        <div className="mb-2">
          <input className="pass form-control" name="password" type="password" placeholder="Password" onChange={this.handlePasswordChange} />
        </div>
        <button type="submit" className="btn btn-primary btn-block" onClick={this.handleLogin}>Log In / Sign Up</button>
      </div>
    );
  },
  handleLogin: function () {
    console.log("EMail: " + this.state.email);
    console.log("Password: " + this.state.password);

    axios.post('/login', {
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
})

export default Login;
