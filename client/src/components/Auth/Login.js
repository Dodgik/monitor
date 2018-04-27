import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user_actions';

class Login extends Component {
  
  handleLogin() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    this.props.loginSend({
      email: email,
      password: password,
    });
  }

  openForgot() {
    this.props.openForgot();
  }
  
  render () {
    console.warn('-->Login.render:', this.props);
    return (
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
            <Link to="/forgot" className="text-center text-dark" onClick={this.openForgot.bind(this)}><u>Forgot account?</u></Link>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sending: state.user.sending,
  message: state.user.message,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  loginSend: (user) => {
    dispatch(userActions.loginSend(user));
  },
  openForgot: () => {
    dispatch(userActions.forgotOpen());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);