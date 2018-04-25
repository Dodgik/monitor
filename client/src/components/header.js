import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as listActions from '../actions/list_actions';
import { Popper, Arrow } from 'react-popper'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUserInfo: false,
      show: false,
    };
  }

  handleClick(e) {
    this.setState({ target: e.target, show: !this.state.show });
  }

  toggleUserInfo(e) {
    e.stopPropagation();
    this.setState({ openUserInfo: !this.state.openUserInfo });
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
      <div className="header m-2">

        <button type="button" className="icon-logo" onClick={this.handleClick.bind(this)} ref={(div) => this.target = div}></button>
        {this.state.show && (
          <Popper className="popper popover fade bs-popover-bottom show" target={this.target}>
            <div className="popover-body">
              <h5>{this.props.displayName}</h5>
              <h6>{this.props.email}</h6>
            </div>
            <h3 className="popover-header text-right">
              <a href="/logout">
                <button type="button" className="btn btn-outline-secondary btn-sm">Logout</button>
              </a>
            </h3>
            <Arrow className="popper__arrow arrow "/>
          </Popper>
        )}

        <div className="user-name mt-1">
          Welcome,
          <div className="dropdown float-right ml-3">
            <a className="dropdown-toggle text-dark" href="#" onClick={this.toggleUserInfo.bind(this)}>
             {this.props.displayName}
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="/logout"><button type="button" className="btn btn-primary btn-block">Logout</button></a>
            </div>
          </div>
        </div>
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
