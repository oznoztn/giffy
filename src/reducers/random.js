import * as Actions from '../actions/random';

const initialState = {
  gif: {
    thumbnail: '',
    full: ''
  },
  isRandomGifLoading: false
};

export default (state, action) => {
  if (state === undefined) {
    return initialState;
  }
  switch (action.type) {
    case Actions.NEW_RANDOM_RANDOM_SUCCESS:
      return {
        ...state,
        isRandomGifLoading: false,
        gif: {
          thumbnail: action.payload.images.preview_gif.url,
          full: action.payload.images.original.url
        }
      };
    case Actions.NEW_RANDOM: {
      return {
        ...state,
        isRandomGifLoading: true
      };
    }
    case Actions.NEW_RANDOM_RANDOM_ERROR:
      return {
        ...state,
        isRandomGifLoading: false
      };
      break;
    default:
      return state;
  }
};
