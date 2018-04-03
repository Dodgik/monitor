import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  toggleMinimize() {

  }

  render() {
    return (
      <div className="header p-1">
        <div className="user-name">Welcome, {this.props.displayName}</div>
        <div className="minimize"></div>
         <button type="button" className="btn btn-light minimize" onClick={this.toggleMinimize.bind(this)}></button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  displayName: state.user.displayName,
});

export default connect(mapStateToProps)(Header);
