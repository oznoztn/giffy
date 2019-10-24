import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { NEW_RANDOM } from '../actions/random';
import { randomSuccess, randomError } from '../actions/random';

const apiKey = 'X526TF5MtCb4CENJ8w1Cwunn6metDLyT';

function* fetchRandomGif() {
  try {
    const params = {
      apiKey,
      headers: { 'Access-Control-Allow-Origin': '*' }
    };

    const searchResult = yield call(
      axios.get,
      `https://api.giphy.com/v1/gifs/random`,
      { params }
    );

    // yield the result of calling put with the NEW_RANDOM_RANDOM_SUCCESS action.
    yield put(randomSuccess(searchResult.data.data));
  } catch (_) {
    yield put(randomError());
  }
}

export default function*() {
  yield takeLatest(NEW_RANDOM, fetchRandomGif);
}
