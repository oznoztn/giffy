import * as Actions from '../actions/selection';

const initialState = {
  isShown: false,
  gif: {
    full: '',
    thumbnail: ''
  }
};

export default function(state, action) {
  if (state === undefined) {
    return initialState;
  }
  switch (action.type) {
    case Actions.SELECT_GIF:
      return {
        ...state,
        isShown: true,
        gif: action.payload
      };
    case Actions.UNSELECT:
      return {
        ...state,
        isShown: false,
        gif: {
          full: '',
          thumbnail: ''
        }
      };
    default:
      return state;
  }
}
