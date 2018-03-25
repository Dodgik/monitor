import React from 'react';
import Login from '../components/login';

const LoginPanel = (props, context) => {
  //console.warn('-->LoginPanel.props:', props)
  return (
  <div className="p-2">
    { props.user.loggedIn ? (
      <a href="/logout"><button type="button" className="btn btn-primary btn-block">Logout</button></a>
    ) : (
      <Login />
    )}
    </div>
  );
};

export default LoginPanel;