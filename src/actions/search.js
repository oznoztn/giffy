export const PERFORM_SEARCH = 'PERFORM_SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const NEW_SEARCH = 'NEW_SEARCH';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export const searchError = () => ({
  type: SEARCH_ERROR
});

export const performSearch = () => ({
  type: PERFORM_SEARCH
});

export const newSearch = searchTerm => ({
  type: NEW_SEARCH,
  searchTerm
});

export const searchSuccess = searchResults => ({
  type: SEARCH_SUCCESS,
  results: searchResults
});
