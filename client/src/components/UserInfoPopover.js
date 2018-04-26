import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popper, Arrow } from 'react-popper'


class UserInfoPopover extends Component {

  handleLogoutClick(e) {
    //e.stopPropagation();
    //e.preventDefault();
  }

  render() {
    return (
      <Popper className="popper popover fade bs-popover-bottom show" target={this.props.target}>
        <div className="popover-body">
          <div className="row">
            <div className="col-sm-2">
              <div className="icon-logo bg-dark rounded-circle position-static m-auto"></div>
            </div>
            <div className="col-sm-10">
              <h5>{this.props.displayName}</h5>
              <h6>{this.props.email}</h6>
            </div>
          </div>
        </div>
        <h3 className="popover-header text-right">
          <a href="/logout">
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.handleLogoutClick.bind(this)}>Logout</button>
          </a>
        </h3>
        <Arrow className="popper__arrow arrow "/>
      </Popper>
    )
  }
}

const mapStateToProps = state => ({
  displayName: state.user.displayName,
  firstname: state.user.firstname,
  lastname: state.user.lastname,
  email: state.user.email,
});

export default connect(mapStateToProps)(UserInfoPopover);
