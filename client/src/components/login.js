import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import * as userActions from '../actions/user_actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForgot: false,
      loginError: '',
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
        console.error(error);
        this.setState({ loginError: error.message });
      });
  }

  handleForgotEmailChange(e) {
    this.setState({ forgotEmail: e.target.value });
  }
  handleForgot() {
    console.log('ForgotEMail: ' + this.state.forgotEmail);
    this.props.sendForgot({ email: this.state.forgotEmail });
    /*
    let apiHost = app.apiHost || '/'
    axios.post(`${apiHost}forgot`, { email: this.state.forgotEmail },
      { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .then(function (response) {
        let res = error.response.data;
        console.log(res);
        //window.location.reload()
      })
      .catch(function (error) {
        let err = error.response.data;
        console.error(err);
        this.setState({ forgotError: err.message });
      });
    */
  }
  toggleForgot(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.openForgot();
    this.setState({ showForgot: !this.state.showForgot });
    return false;
  }

  handleCloseReset() {
    this.props.resetClose();
  }
  handleReset() {
    var pass = this.refs.newPassword.value;
    var passConfirm = this.refs.newPasswordConfirm.value;
    console.log('handleReset: ' + pass);

    this.props.resetSend({
      password: pass,
      passwordConfirm: passConfirm,
      token: this.props.recovery,
    });
  }

  render () {
    console.warn('-->Login.render:', this.props);
    return (
      <div style={{ margin: 10 }} className="text-center">
      {this.props.recovery ? (
        <div>
          <div method="post" action="reset">
            {this.props.message ? (
              <div>
                <div className="bg-white rounded p-2 mb-2 font-weight-bold text-center text-success">{this.props.message}</div>
                <button type="submit" className="btn btn-secondary btn-block" onClick={this.toggleForgot.bind(this)}>Close</button>
              </div>
            ) : (
                <div>
                  <div className="mb-2">Please enter your new password</div>
                  <div className="mb-2">
                    <input className="form-control mb-2" name="password" type="password" placeholder="Password" ref="newPassword" />
                    <input className="form-control" name="password_confirm" type="password" placeholder="Same Password" ref="newPasswordConfirm" />
                  </div>
                  {this.props.sending ? (<div className="mt-2 text-warning text-center">Sending...</div>) : (
                    <div className="btn-block text-left clearfix">
                      <button type="submit" className="btn btn-primary" onClick={this.handleReset.bind(this)}>Save</button>
                      <Link to="/" className="btn btn-secondary float-right" onClick={this.handleCloseReset.bind(this)}>Cancel</Link>
                    </div>
                  )}
                  {this.props.error ? (<div className="text-danger rounded p-0 mt-2 bg-white">{this.props.error}</div>) : (<div className="mb-2 mt-2"></div>)}
                </div>
              )}
          </div>
        </div>
      ) : (
        <div>
          {!this.state.showForgot ? (
            <div method="post" action="login">
              <div className="mb-2">
                <input className="form-control" name="email" type="text" placeholder="Email" onChange={this.handleEmailChange.bind(this)} />
              </div>
              <div className="mb-2">
                <input className="form-control" name="password" type="password" placeholder="Password" onChange={this.handlePasswordChange.bind(this)} />
              </div>
              <div className="mb-2 text-warning">{this.state.loginError}</div>
              <button type="submit" className="btn btn-primary btn-block" onClick={this.handleLogin.bind(this)}>Log In / Sign Up</button>
              <a className="text-center text-dark" href="#" onClick={this.toggleForgot.bind(this)}><u>Forgot account?</u></a>
            </div>
          ) : (
            <div method="post" action="forgot">
              {this.props.message ? (
                <div>
                    <div className="bg-white rounded p-2 mb-2 font-weight-bold text-center text-success">{this.props.message}</div>
                    <button type="submit" className="btn btn-secondary btn-block" onClick={this.toggleForgot.bind(this)}>Close</button>
                </div>
              ) : (
                <div>
                  <div className="mb-2">Please enter your email</div>
                  <div className="mb-2">
                      <input className="form-control" name="email" type="text" placeholder="Email" onChange={this.handleForgotEmailChange.bind(this)} />
                  </div>
                  {this.props.sending ? (<div className="mt-2 text-warning text-center">Sending...</div>) : (
                    <div className="btn-block text-left clearfix">
                      <button type="submit" className="btn btn-primary" onClick={this.handleForgot.bind(this)}>Forgot</button>
                      <button type="submit" className="btn btn-secondary float-right" onClick={this.toggleForgot.bind(this)}>Cancel</button>
                    </div>
                  )}
                  {this.props.error ? (<div className="text-danger rounded p-0 mt-2 bg-white">{this.props.error}</div>) : (<div className="mb-2 mt-2"></div>)}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sending: state.user.sending,
  message: state.user.message,
  error: state.user.error,
  recovery: state.user.recovery,
});

const mapDispatchToProps = dispatch => ({
  openForgot: () => {
    dispatch(userActions.forgotOpen());
  },
  sendForgot: (user) => {
    dispatch(userActions.forgot(user));
  },
  resetClose: () => {
    dispatch(userActions.resetClose());
  },
  resetSend: (user) => {
    dispatch(userActions.resetSend(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);