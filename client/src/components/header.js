import React, { PropTypes, Component } from 'react';

const propTypes = {
  displayName: PropTypes.string
};

const defaultProps = {
  displayName: ''
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: this.props.displayName
    };
  }

  render() {
    return (
      <div className="header m-1">
        <div className="user-name">Welcome, {this.state.displayName}</div>
      </div>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
