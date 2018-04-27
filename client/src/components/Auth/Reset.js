import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user_actions';

class Reset extends Component {

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

  handleClose() {
    this.props.resetClose();
    this.props.onClose();
  }

  render () {
    console.warn('-->Reset.render:', this.props);
    return (
      <div method="post" action="reset">
        {this.props.message ? (
          <div>
            <div className="bg-white rounded p-2 mb-2 font-weight-bold text-center text-success">{this.props.message}</div>
            <button type="submit" className="btn btn-secondary btn-block" onClick={this.handleClose.bind(this)}>Close</button>
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
                <Link to="/" className="btn btn-secondary float-right" onClick={this.handleClose.bind(this)}>Cancel</Link>
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
  sending: state.user.sending,
  message: state.user.message,
  error: state.user.error,
  recovery: state.user.recovery,
});

const mapDispatchToProps = dispatch => ({
  resetClose: () => {
    dispatch(userActions.resetClose());
  },
  resetSend: (user) => {
    dispatch(userActions.resetSend(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Reset);