import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga'
import { AppContainer } from 'react-hot-loader';

import reducers from './reducers/index';
import App from './app';

/*
Here we are getting the initial state injected by the server. See routes/index.js for more details
 */
const initialState = window.__INITIAL_STATE__; // eslint-disable-line
const user = window.user; // eslint-disable-line

//console.warn('-->reducers: ', reducers)
//console.warn('-->initialState: ', initialState)
const store = createStore(reducers, initialState);
/*
const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
const store = {
  ...createStore(reducers, initialState, applyMiddleware(sagaMiddleware)),
  runSaga: sagaMiddleware.run,
}
*/
window.store = store;

/*
While creating a store, we will inject the initial state we received from the server to our app.
 */
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component user={user}/>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('body-wrap'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line
    const nextApp = require('./app').default;
    render(nextApp);
  });
}

// module.hot.accept('./reducers', () => {
//   // eslint-disable-next-line
//   const nextRootReducer = require('./reducers/index');
//   store.replaceReducer(nextRootReducer);
// });
