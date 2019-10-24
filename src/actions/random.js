export const NEW_RANDOM_RANDOM_SUCCESS = 'NEW_RANDOM_RANDOM_SUCCESS';
export const NEW_RANDOM_RANDOM_ERROR = 'NEW_RANDOM_RANDOM_ERROR';
export const NEW_RANDOM = 'NEW_RANDOM';

export const randomSuccess = randomGif => ({
  type: NEW_RANDOM_RANDOM_SUCCESS,
  payload: randomGif
});

export const randomError = () => ({
  type: NEW_RANDOM_RANDOM_ERROR
});

export const newRandom = () => ({
  type: NEW_RANDOM
});
