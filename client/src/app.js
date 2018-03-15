import React, { PropTypes, Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header';
import LoginPanel from './components/LoginPanel';
import Map from './components/map';
import Menu from './components/menu';
import Home from './components/home';
import NotFound from './components/not_found';
import ItemView from './containers/list_item_view';
import ListItems from './containers/list_items';
//import favicon from '../res/images/favicon.ico';
import { connect } from 'react-redux';
import { viewItem } from './actions/list_actions';

const propTypes = {
  user: PropTypes.object
};

const defaultProps = {
  user: {}
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user
    };
  }

  render() {
    console.warn('-->App.render:', this.props)
    return (
      <div className="app-root">
        <div className="panel">
          <Header displayName={this.state.user.displayName} />
          <LoginPanel {...this.state} />
          {/*<ListItems {...this.props} />*/}
          <Menu />
          <Route exact path='/' render={(props) => (
            <ItemView {...props} user={this.state.user} />
          )} />
            {/*<Home {...props} user={this.state.user} />*/}
          {/*<Route exact path="/" component={Home} user={this.state.user} />*/}
          <Route path='/view/:name' render={(props) => (
            <ItemView {...props} user={this.state.user} />
          )} />
          {/*<Route exact path="/view/:name" component={ItemView} />*/}
          {/*<Route exact path='*' component={NotFound} />*/}
        </div>
        {/*<Map id="map" />*/}
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapStateToProps = state => ({
  active: state.list.active,
  items: state.list.items,
});
const mapDispatchToProps = dispatch => ({
  viewItem: (name) => {
    dispatch(viewItem(name));
  },
});

//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
