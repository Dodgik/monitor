import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as listActions from '../actions/list_actions';
import { Popper, Arrow } from 'react-popper'
import UserInfoPopover from './UserInfoPopover'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUserInfo: false,
      show: false,
    };
  }

  handleBlur(e) {
    clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => this.setState({ target: e.target, openUserInfo: false }), 500);
  }

  toggleUserInfo(e) {
    e.preventDefault();
    clearTimeout(this.closeTimer);
    this.setState({ target: e.target, openUserInfo: !this.state.openUserInfo });
  }

  toggleMinimize() {
    if (this.props.menuClosed) {
      this.props.openMenu();
    } else {
      this.props.closeMenu();
    }
    this.props.onMenuClose();
  }

  render() {
    return (
      <div className="header m-2" onBlur={this.handleBlur.bind(this)}>
        <div className="user-name mt-1">
          Welcome,
          {this.props.loggedIn ? (
            <a className="dropdown-toggle text-dark ml-2" href="#" onClick={this.toggleUserInfo.bind(this)} ref={(div) => this.target = div}>
              {this.props.displayName}
            </a>
          ):(
            <span className="ml-2">{this.props.displayName}</span>
          )}
        </div>
        {this.state.openUserInfo && (<UserInfoPopover target={this.target} />)}

        {this.props.menuClosed ? (
          <button type="button" className="btn btn-info btn-sm show-menu" onClick={this.toggleMinimize.bind(this)}>Menu</button>
        ):(
          <button type="button" className="btn btn-light close" onClick={this.toggleMinimize.bind(this)}></button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  displayName: state.user.displayName,
  email: state.user.email,
  menuClosed: state.list.menuClosed,
});

const mapDispatchToProps = dispatch => ({
  closeMenu: () => {
    dispatch(listActions.minimizeMenu());
  },
  openMenu: () => {
    dispatch(listActions.openMenu());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
