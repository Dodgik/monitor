import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import menuItems from '../consts/menuItems';

class Menu extends Component {
  render() {
    const { items } = this.props;
    return (
      <ul className="nav nav-tabs menu-items btn-group" role="group">
        {
          Object.keys(items).map((key) => {
            const item = items[key];
            //console.log('-->Menu.item: ', item)
            return (
              <li className="nav-item" key={item.name}>
                <NavLink exact to={item.default ? '/' : `/view/${item.name}`} key={item.name} className="nav-link" activeClassName="active">
                  {item.title}
                </NavLink>
              </li>
            );
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
  items: menuItems,
  active: 'devices'
};

export default Menu;