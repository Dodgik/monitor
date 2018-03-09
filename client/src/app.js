import React, { PropTypes, Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header';
import Map from './components/map';
import Home from './components/home';
import ItemView from './containers/list_item_view';
//import favicon from '../res/images/favicon.ico';

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
    /*
          <Route exact path="/" component={Home} user={this.state.user} />
          <Route exact path="/view/:name" component={ItemView} />
    */
    return (
      <div className="app-root">
        <div className="panel">
          <Header displayName={this.state.user.displayName} />
          <Route exact path='/' render={(props) => (
            <Home {...props} user={this.state.user} />
          )} />
          <Route exact path='/view/:name' render={(props) => (
            <ItemView {...props} user={this.state.user} />
          )} />
        </div>
        <Map id="map" />
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
