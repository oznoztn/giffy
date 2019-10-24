import { LOCATION_CHANGE } from 'connected-react-router';

import {
  SEARCH_SUCCESS,
  PERFORM_SEARCH,
  NEW_SEARCH,
  SEARCH_ERROR
} from '../actions/search';

const OFFSET_VALUE = 50;
const initialState = {
  results: [],
  currentOffset: 0,
  searchTerm: null,
  isLoading: false,
  // InfiniteScroll componenti tarafından
  //   sayfanın SCROLL eventine bağlanılıp bağlanılmayacağını belirleyen prop:
  // Default false çünkü hiç arama yapılmadan,
  //   InfiniteScroll'un API'ye çağrıda bulunmasını istemiyoruz.
  isActive: false
};

function searchResultTransformer(rawResult) {
  // rawResult is the result comes from the GIPHY Api
  // We need to transform it into the shape that our SearchResults component expects
  //   which is an array of SearchResult object.
  const { images } = rawResult;

  return {
    thumbnail: images.fixed_height_small_still.url,
    full: images.original.url
  };
}

// If you remember, a reducer function have to take two args: the state and an action
export default (state, action) => {
  if (state === undefined) {
    return initialState;
  }
  switch (action.type) {
    case SEARCH_SUCCESS:
      return {
        ...state,
        currentOffset: state.currentOffset + OFFSET_VALUE,
        isLoading: false,
        results: state.results.concat(
          // as you guess this map method is called for each element of the payload
          action.results.map(searchResultTransformer)
        ),
        // isActive: state.isActive
        // Eğer istediğimizden daha az sayıda bir gif aldıysak,
        //   API (exhausted yani) artık yollamıyor demektir.
        //     O halde isActive false yapılıyor.
        isActive: action.results.length === 50
      };
    case NEW_SEARCH:
      return {
        ...state,
        results: [],
        currentOffset: 0,
        searchTerm: action.searchTerm
      };
    case PERFORM_SEARCH:
      return {
        ...state,
        isLoading: true
      };
    case SEARCH_ERROR:
      return {
        ...state,
        isLoading: false
      };
    // Sayfalar arası navigasyon gerçekleştiğinde
    //  LOCATION_CHANGE aksiyonu her zaman store'a dispatch edilir.
    // LOCATION_CHANGE action'ına bağlanıp,
    //  sayfa değiştiğinde initialState'i döndererek
    //    mevcut state bilgilerini resetliyorum:
    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }
};
