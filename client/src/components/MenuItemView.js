import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { viewItem } from '../actions/list_actions';
import Menu from './Menu';
import Devices from './Devices';
import Groups from './Groups';
import Account from './Account';

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
        <div>
          <Menu />

          <div className="view_item" key={item.name}>
            <Component {...this.props} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Menu />

          <div className="view_item" key={item.name}>
            <Link to={'/'}>
              <button type="button">Back</button>
            </Link>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
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


const mapStateToProps = state => ({
  item: state.list.itemView,
  defaultItemName: state.list.defaultItemName,
});

const mapDispatchToProps = dispatch => ({
  viewItem: (name) => {
    dispatch(viewItem(name));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(ListItemView);
