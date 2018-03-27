import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <div className="header m-1">
        <div className="user-name">Welcome, {this.props.displayName}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  displayName: state.user.displayName,
});

export default connect(mapStateToProps)(Header);
