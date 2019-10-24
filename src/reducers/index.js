import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import searchReducer from './search'; // import the search reducer
import selectionReducer from './selection';
import randomReducer from './random';

export default history =>
  combineReducers({
    router: connectRouter(history),
    search: searchReducer,
    selection: selectionReducer,
    random: randomReducer
  });

/**
import { combineReducers } from 'redux';
import searchReducer from './search'; // import the search reducer
import { routerReducer } from 'react-router-redux';

// The result of this function (which is also a func)
//   will be used as our app's main reducer
export default combineReducers({
  router: routerReducer,
  // Key: Matches the branch in the state
  // Value: The reducer function will be used for that branch
  search: searchReducer
});

// THE REDUCER (MAIN)

 */
