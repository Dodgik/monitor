import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Home from './home';
import Devices from './devices';
import Groups from './groups';
import Account from './account';

class ListItemView extends Component {
  components = {
    Devices: Devices,
    Groups: Groups,
    Account: Account
  };

  componentWillMount() {
    const { viewItem, match, item, defaultItemName } = this.props;
    const name = match.params.name || defaultItemName;
    //console.warn('-->ListItemView.WillMount:', match.params, '  item: ', item.name)
    viewItem(name);
  }
  componentWillUpdate() {
    const { viewItem, match, item, defaultItemName } = this.props;
    const name = match.params.name || defaultItemName;
    //console.warn('-->ListItemView.WillUpdate:', match.params, '  item: ', item.name)
    viewItem(name);
  }

  componentDidMount() {
    const { viewItem, match, item, defaultItemName } = this.props;
    const name = match.params.name || defaultItemName;
    console.warn('-->ListItemView.DidMount:', match.params, '  item: ', item.name)
    //viewItem(name);
  }
  componentDidUpdate() {
    const { viewItem, match, item, defaultItemName } = this.props;
    const name = match.params.name || defaultItemName;
    //console.warn('-->ListItemView.DidUpdate:', match.params, '  item: ', item.name)
    viewItem(name);
  }
  render() {
    const { item, match } = this.props;
    if (!item) {
      return (<div>Loading...</div>);
    }

    //console.warn('-->ListItemView.render:', match.params, '  item: ', item.name)
    if (item.component) {
      var Component = this.components[item.component];
      return (
        <div className="view_item" key={item.name}>
          <Component {...this.props} />
        </div>
      );
    } else {
      return (
        <div className="view_item" key={item.name}>
          <Link to={'/'}>
            <button type="button">Back</button>
          </Link>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
      );
    }
  }
}

ListItemView.propTypes = {
  viewItem: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  item: PropTypes.object,
};

ListItemView.defaultProps = {
  item: null,
};

export default ListItemView;
