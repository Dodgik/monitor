import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/login';

const LoginPanel = (props, context) => {
  console.warn('-->LoginPanel.props:', props)
  console.warn('-->LoginPanel.context:', context)
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

export default connect(mapStateToProps)(LoginPanel);