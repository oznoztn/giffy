import { connect } from 'react-redux';
import SearchResults from './SearchResults';
import { selectGif } from '../../actions/selection';

function mapStateToProps(state) {
  return {
    /* 
      GOD ! 
      PAY ATTENTION! 
      THE 'RESULTS' ARRAY IS NOT INSIDE THE 'STATE'
      IT RESIDES IN THE STATE.SEARCH BRANCH, 
        BECAUSE WE HAVE SPLITTED THE MAIN REDUCER INTO SUB-REDUCERS 
          THEREFORE WE ARE WORKING WITH BRANHCES ON THE STATE NOW!
      
        IN A NORMAL CASE WHICH THE APP HAS ONLY ONE (MAIN) REDUCER
        WE COULD SAY 'TAKE RESULTS OBJECT FROM THE STATE.RESULTS!'  
      
        BUT THIS IS NOT THE CASE THIS TIME !!!
    */

    // results: state.results,
    results: state.search.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onResultSelection: selectedGif => dispatch(selectGif(selectedGif))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
