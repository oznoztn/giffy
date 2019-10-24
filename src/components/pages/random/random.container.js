import { connect } from 'react-redux';
import Random from './random';
import { newRandom } from '../../../actions/random';
import { selectGif } from '../../../actions/selection';

function mapStateToProps(state) {
  return {
    gif: state.random.gif,
    isRandomGifLoading: state.random.isRandomGifLoading,
    isShown: state.selection.isShown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRandomGifRequested: () => dispatch(newRandom()),
    onRandomGifClick: selectedGif => dispatch(selectGif(selectedGif))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Random);
