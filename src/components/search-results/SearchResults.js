import React from 'react';
import PropTypes from 'prop-types';
import * as CustomTypes from '../../lib/CustomTypes';
import SearchResult from '../search-result/SearchResult';
import styles from './SearchResults.css';

// { results }: Extract the results from the props
export default function SearchResults({ results, onResultSelection }) {
  return (
    <div className={styles.container}>
      {results.map((result, i) => (
        <SearchResult
          key={i}
          result={result}
          onResultSelection={onResultSelection}
        />
      ))}
    </div>
  );
}

SearchResults.propTypes = {
  // The prop results is an array of our custom type SearchResult
  results: PropTypes.arrayOf(CustomTypes.SearchResult),
  onResultSelection: PropTypes.func.isRequired
};
