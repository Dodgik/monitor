import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as listActions from '../actions/list_actions';

class Header extends Component {
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
      <div className="header p-2 m-1">
        <div className="user-name">Welcome, {this.props.displayName}</div>
        {this.props.menuClosed ? (
          <button type="button" className="btn btn-info btn-sm show-menu" onClick={this.toggleMinimize.bind(this)}>Menu</button>
        ):(
          <button type="button" className="btn btn-light close" onClick={this.toggleMinimize.bind(this)}>
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  displayName: state.user.displayName,
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
