import React, { PropTypes, Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import { AuthRoutes } from './components/Auth';
import Map from './components/Map';
import MenuItemView from './components/MenuItemView';
import Forgot from './components/Auth/Forgot';


class App extends Component {
  constructor() {
    super();

    this.state = {
      menuClosed: false
    }
  }

  onMenuClose() {
    this.setState({ menuClosed: !this.state.menuClosed });
  }

  render() {
    //console.warn('-->App.render:', this.props)
    let rootClassName = 'app-root'
    if (this.state.menuClosed)
      rootClassName += ' minimized'

    return (
      <div className={rootClassName}>
        <div className="panel">
          <Header onMenuClose={this.onMenuClose.bind(this)} />

          <AuthRoutes />
          <Route exact path='/' render={(props) => (
            <MenuItemView {...props} />
          )} />
          <Route path='/view/:name' render={(props) => (
            <MenuItemView {...props} />
          )} />
          {/*<Route exact path="/view/:name" component={MenuItemView} />*/}
        </div>
        <Map id="map"/>
      </div>
    );
  }
}

export default App;