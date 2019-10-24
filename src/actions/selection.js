export const SELECT_GIF = 'SELECT_GIF';
export const UNSELECT = 'UNSELECT';

export const selectGif = selectedGif => ({
  type: SELECT_GIF,
  payload: selectedGif
});

export const unselect = () => ({
  type: UNSELECT
});
