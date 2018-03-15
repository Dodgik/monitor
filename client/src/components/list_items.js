import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.active
    };
  }
  componentWillMount() {
    console.warn('-->Menu.WillMount:', this.props);
    //viewItem(name);
  }
  componentWillUpdate() {
    console.warn('-->Menu.WillUpdate:', this.props);
    if (this.props.active) {
      //this.props.viewItem(this.props.active);
    }
  }
  componentDidMount() {
    console.warn('-->Menu.DidMount:', this.props);
    //viewItem(name);
  }
  componentDidUpdate() {
    console.warn('-->Menu.DidUpdate:', this.props);
    if (this.props.active) {
      //this.props.viewItem(this.props.active);
    }
  }
  
  selectItem(name) {
    const { viewItem } = this.props;
    viewItem(name);
    this.setState({ active: name })
  }

  isActive(name) {
    const className = 'nav-link icon-' + name + ((name === this.state.active) ? ' active' : '');
    console.warn('-->Menu.isActive:', className);
    return className;
    //return 'btn btn-secondary icon-' + name + ((name === this.state.active) ? ' active' : '');
  }

  renderList() {
    const { items } = this.props;
    console.warn('-->Menu.render:', this.props);
    return Object.keys(items).map((key) => {
      const item = items[key];
      /*
      if (item.preview) {
        return (
          <button className={this.isActive(item.name)} type="button" key={item.name} onClick={this.selectItem.bind(this, item.name)}>
            {item.title}
          </button>
        );
      } else {
      */
      if (!item.preview) {
        return (
          <li className="nav-item" key={item.name}>
            <Link to={item.default ? '/' : `/view/${item.name}`} key={item.name} className={this.isActive(item.name)}>
                {item.title}
            </Link>
          </li>
        );
      }
    });
  }

  render() {
    return (
      <ul className="nav nav-tabs list_items btn-group" role="group">
        { this.renderList() }
      </ul>
    );
  }
}

ListView.propTypes = {
  items: PropTypes.object.isRequired,
  viewItem: PropTypes.func.isRequired,
  active: PropTypes.string,
};
ListView.defaultProps = {
  active: ''
};

export default ListView;
