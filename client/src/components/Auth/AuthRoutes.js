import React from 'react';
import { withRouter } from 'react-router'
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose'
import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';


const AuthRoutes = (props) => {

  const handleClose = () => {
    props.history.push('/')
  }

  const openForgot = () => {
    
  }

  console.warn('-->AuthRoutes.render:', props);
  return (
    <div className="p-2 text-center" style={{ margin: 10 }}>
      <Switch>
        <Route exact path='/forgot' render={(rProps) => (
          props.loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Forgot {...rProps} onClose={handleClose.bind(this)} />
          )
        )} />
        <Route exact path="/reset/:tocken" render={(rProps) => (
          <Reset {...rProps} onClose={handleClose.bind(this)} />
        )} />
        <Route render={(rProps) => (
          props.loggedIn ? (
            null
          ) : (
            <Login {...rProps} />
          )
        )} />
      </Switch>
    </div>
  )
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

export default withRouter(connect(mapStateToProps)(AuthRoutes));