import axios from 'axios';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { PERFORM_SEARCH } from '../actions/search';
import { searchSuccess, searchError } from '../actions/search';
const apiKey = 'X526TF5MtCb4CENJ8w1Cwunn6metDLyT';

const selectSearchState = state => state.search;

// Notice that this is a generator function:
function* doSearch() {
  // select takes a function that returns the branch of the state you want.
  // This won't work without the yield statement, so pay heed to it.
  const { currentOffset, searchTerm } = yield select(selectSearchState);
  try {
    let endpoint;
    const params = {
      apiKey,
      limit: 50,
      offset: currentOffset,
      headers: { 'Access-Control-Allow-Origin': '*' },
      mode: 'cors'
    };

    if (searchTerm === undefined) {
      endpoint = 'trending';
    } else {
      endpoint = 'search';
      params.q = searchTerm;
    }

    const searchResult = yield call(
      axios.get,
      `https://api.giphy.com/v1/gifs/${endpoint}`,
      { params }
    );

    yield put(searchSuccess(searchResult.data.data));
  } catch (_) {
    yield put(searchError());
  }
}

export default function*() {
  yield takeLatest(PERFORM_SEARCH, doSearch);
}

/**
 * Sagas are to some extend pure functions
 * so it should not run any code which causes side effect(s) themselves
 * That means it can not make http request or update the state directly
 * But it can do these things indirectly
 *
 * the arguments of axios.get:
 *   function to call, url, an object for axios to construct the query string
 *
 * call() fonksiyonu HTTP çağrısında bulunmuyor.
 * Bu işi verilen argümanlar ile yapacak olan objeyi oluşturmasını emrediyor.
 * Bu obje üzerindeki ilk next() çağrısında axios.get() çalışacak.
 *   Request tamamlandığında, Saga obje üzerinde ikinci kez next() metodunu çağıracak
 *     ve searchResult oluşturulacak.
 *
 * Tüm bunlar için kafa yormana gerek yok.
 * Tek yapman gereken jeneratör fonksiyonunu yazmak ve bunu bir Action ile ilişkilendirmek.
 *
 * Elimizde searchResult olduğuna göre searchSuccess aksiyonunu çağırmamız gerekiyor.
 * Dispatch işlemini direk olarak yapamayız, yani call() metodunu çağıramayız.
 * Bunun yerine özel bir metot olan put() metodunu kullanmalıyız.
 *
 *
 * searchResults.data.data
 *   axios.get returns a response object
 *   That response object has data prop which is the http get response body
 *   And that response body is the response from the giphy api
 *   (searchSuccess(searchResults.data.data) returns the Action object
 *
 * put() method instructs the middleware to dispatch the action to the Redux Store
 */

/**
 * SEARCH_PERFORMED Aksiyonu ile doSearch() fonksiyonunu ilişkilendirme:
 * En son dispatch edilmiş SEARCH_PERFORMED Aksiyonunu al ve doSearch fonksiyonunu çalıştır.
 * Argüman olarak da aksiyonun kendisini ver.
 *   Aksiyonun içinde de searchTerm var, dolayısıyla destruction'ı gerçekleştir:
 *     doSearch({ searchTerm })
 */
