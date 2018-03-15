import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import LIST_ITEMS from '../consts/list_items';

class Menu extends Component {
  render() {
    const { items } = this.props;
    return (
      <ul className="nav nav-tabs list_items btn-group" role="group">
        {
          Object.keys(items).map((key) => {
            const item = items[key];
            if (!item.preview) {
              return (
                <li className="nav-item" key={item.name}>
                  <NavLink exact to={item.default ? '/' : `/view/${item.name}`} key={item.name} className="nav-link" activeClassName="active">
                    {item.title}
                  </NavLink>
                </li>
              );
            }
          })
        }
      </ul>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.object.isRequired,
  active: PropTypes.string,
};
Menu.defaultProps = {
  items: LIST_ITEMS,
  active: 'devices'
};

export default Menu;
