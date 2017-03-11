/*jshint esversion: 6 */

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFound from './components/NotFound';
import { createStore,applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';

//delete process.env.BROWSER;

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, '../dist')));

// universal routing and rendering
app.get('*', (req, res) => {

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
    )
);
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {

        const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

        // if the current route matched we have renderProps
        markup = renderToString(InitialView);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFound/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

server.listen(process.env.PORT || 8081, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on`);
});