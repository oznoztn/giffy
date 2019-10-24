import 'babel-regenerator-runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducers';
import App from './components/app/AppContainer';
import { createLogger } from 'redux-logger';

// Import the saga we have just created along with the sagas middleware:
import createSagaMiddleware from 'redux-saga';
import searchSaga from './sagas/search';
import randomSaga from './sagas/random';

// Setup routing
import { Router, Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import SearchPage from './components/pages/search/search.container';
import TrendingPage from './components/pages/trending/trending.container';
import RandomPage from './components/pages/random/random.container';

const sagas = createSagaMiddleware();
const history = createBrowserHistory();

const store = createStore(
  reducer(history),
  compose(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(createLogger()),
    applyMiddleware(sagas)
  )
);

sagas.run(searchSaga);
sagas.run(randomSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} store={store}>
      {/* All our routes will go within this App component  */}
      <App>
        <Route exact path="/" component={props => <SearchPage {...props} />} />
        <Route
          exact
          path="/trending"
          component={props => <TrendingPage {...props} />}
        />
        <Route
          exact
          path="/random"
          component={props => <RandomPage {...props} />}
        />{' '}
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
