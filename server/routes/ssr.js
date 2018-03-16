import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import reducers from '../../client/src/reducers/index';
import { LIST_ACTIONS } from '../../client/src/consts/action_types';
import App from '../../client/src/app';


var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')

const app = express();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var User = require('../db/models/users');
require('../config/passport/passport.js')(passport, User);


const router = express.Router();

router.get('/', (req, res) => {
  //console.log("-->ssr-req-user: ", req.user);
  //console.log("-->ssr-req-session: ", req.session);
  //console.log("-->ssr-req-isAuthenticated: ", req.isAuthenticated());
  var user = {
    displayName: 'Guest',
    loggedIn: req.isAuthenticated()
  };
  if (req.isAuthenticated() && req.user) {
    user.displayName = req.user.email.split('@')[0]
  }
  /*
    http://redux.js.org/docs/recipes/ServerRendering.html
  */
  const store = createStore(reducers);

  store.dispatch({
    user2: 'vas1',
    user: req.user,
    type: LIST_ACTIONS.ITEM_ADD,
    item: {
      name: 'middleware',
      description: `Redux middleware solves different problems than Express or Koa middleware, but in a conceptually similar way.
      It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.`,
    },
  });

  const context = { user: 'vas2' };

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.originalUrl}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>,
  );

  const finalState = store.getState();

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).render('../views/index.ejs', {
      html,
      script: JSON.stringify(finalState),
      user: JSON.stringify(user),
    });
  }
});

export default router;
