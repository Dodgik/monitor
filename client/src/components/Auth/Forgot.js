import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user_actions';


class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    return false;
  }

  handleCloseForgot(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.openForgot();
    this.props.onClose();
    return false;
  }
  
  render () {
    console.warn('-->Forgot.render:', this.props);
    return (
      <div method="post" action="forgot">
        {this.props.message ? (
          <div>
            <div className="bg-white rounded p-2 mb-2 font-weight-bold text-center text-success">{this.props.message}</div>
            <button className="btn btn-secondary btn-block" onClick={this.handleCloseForgot.bind(this)}>Close</button>
          </div>
        ) : (
          <div>
            <div className="mb-2">Please enter your email</div>
            <div className="mb-2">
              <input className="form-control" name="email" type="text" placeholder="Email" onChange={this.handleForgotEmailChange.bind(this)} />
            </div>
            {this.props.sending ? (<div className="mt-2 text-warning text-center">Sending...</div>) : (
              <div className="btn-block text-left clearfix">
                <button className="btn btn-primary" type="submit" onClick={this.handleForgot.bind(this)}>Forgot</button>
                <button className="btn btn-secondary float-right" onClick={this.handleCloseForgot.bind(this)}>Cancel</button>
              </div>
            )}
            {this.props.error ? (<div className="text-danger rounded p-0 mt-2 bg-white">{this.props.error}</div>) : (<div className="mb-2 mt-2"></div>)}
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
  openForgot: () => {
    dispatch(userActions.forgotOpen());
  },
  sendForgot: (user) => {
    dispatch(userActions.forgot(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);