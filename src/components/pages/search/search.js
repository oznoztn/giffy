import React from 'react';
import PropTypes from 'prop-types';
import SearchForm from '../../search-form/SearchForm';
import SearchResults from '../../search-results/SearchResultsContainer';
import InfiniteScroll from '../../infinite-scroll/InfiniteScroll';

export default function Search({
  onSearchSubmitted,
  onInfiniteScroll,
  isSearchLoading,
  isActive
}) {
  return (
    <div>
      <SearchForm
        onSearchSubmitted={searchTerm => onSearchSubmitted(searchTerm)}
      />
      <InfiniteScroll
        isActive={isActive}
        isSearchLoading={isSearchLoading}
        onTrigger={() => onInfiniteScroll()}
      >
        <SearchResults />
      </InfiniteScroll>
    </div>
  );
}

Search.propTypes = {
  onSearchSubmitted: PropTypes.func.isRequired,
  onInfiniteScroll: PropTypes.func.isRequired,
  isSearchLoading: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired
};
