import { connect } from 'react-redux';
import GifLightbox from './GifLightbox';
import { unselect } from '../../actions/selection';

function mapStateToProps(state) {
  return {
    isShown: state.selection.isShown,
    gif: state.selection.gif
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUnselect: () => dispatch(unselect())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifLightbox);
