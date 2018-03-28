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


class App extends Component {
  render() {
    console.warn('-->App.render:', this.props)
    return (
      <div className="app-root">
        <div className="panel">
          <Header />
          <LoginPanel />
          {/*<ListItems {...this.props} />*/}
          <Menu />
          <Route exact path='/' render={(props) => (
            <ItemView {...props}  />
          )} />
            {/*<Home {...props} />*/}
          {/*<Route exact path="/" component={Home} />*/}
          <Route path='/view/:name' render={(props) => (
            <ItemView {...props} />
          )} />
          {/*<Route exact path="/view/:name" component={ItemView} />*/}
          {/*<Route exact path='*' component={NotFound} />*/}
        </div>
        {/**/}
        <Map id="map"/>
      </div>
    );
  }
}

/*
const mapStateToProps = state => ({
  displayName: state.user.displayName,
});

export default connect(mapStateToProps)(App);
*/
export default App;
