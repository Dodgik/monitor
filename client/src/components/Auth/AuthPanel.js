import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';

const AuthPanel = (props) => {
  if (props.loggedIn) {
    return null;
  }
  return (
    <div className="p-2">
      { props.loggedIn ? (
        <a href="/logout"><button type="button" className="btn btn-primary btn-block">Logout</button></a>
      ) : (
        <Login />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

export default connect(mapStateToProps)(AuthPanel);