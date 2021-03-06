import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user_actions';
import Forgot from './Forgot';

class AuthPanel extends Component {
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
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleLogin() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    this.props.loginSend({
      email: email,
      password: password,
    });
  }

  handleForgotEmailChange(e) {
    this.setState({ forgotEmail: e.target.value });
  }
  handleForgot() {
    console.log('ForgotEMail: ' + this.state.forgotEmail);
    this.props.sendForgot({ email: this.state.forgotEmail });
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
    console.warn('-->AuthPanel.render:', this.props);
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
                  <input className="form-control mb-2" name="password" type="password" placeholder="New password" ref="newPassword" />
                  <input className="form-control" name="password_confirm" type="password" placeholder="Confirm Password" ref="newPasswordConfirm" />
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
                <input className="form-control" type="text" placeholder="Email" ref="email" />
              </div>
              <div className="mb-2">
                <input className="form-control" type="password" placeholder="Password" ref="password" />
              </div>
              {this.props.error ? (<div className="text-danger rounded p-0 mb-2 mt-2 bg-white">{this.props.error}</div>) : (<div className="mb-2 mt-2"></div>)}
              {this.props.sending ? (<div className="mt-2 text-warning text-center">Sending...</div>) : (
                <div className="btn-block text-center clearfix">
                  <button type="submit" className="btn btn-primary btn-block" onClick={this.handleLogin.bind(this)}>Log In / Sign Up</button>
                  <a className="text-center text-dark" href="#" onClick={this.toggleForgot.bind(this)}><u>Forgot account?</u></a>
                  <Link to="/forgot" className="text-center text-dark" ><u>Forgot account?</u></Link>
                </div>
              )}
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
  loggedIn: state.user.loggedIn,
  sending: state.user.sending,
  message: state.user.message,
  error: state.user.error,
  recovery: state.user.recovery,
});

const mapDispatchToProps = dispatch => ({
  loginSend: (user) => {
    dispatch(userActions.loginSend(user));
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanel);