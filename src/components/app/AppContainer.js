import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from './App';

// This will hook our container up to the router
//   and make route components within it work properly
export default withRouter(connect(null)(App));
