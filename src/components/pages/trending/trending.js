import React from 'react';
import PropTypes from 'prop-types';
import SearchResults from '../../search-results/SearchResultsContainer';
import InfiniteScroll from '../../infinite-scroll/InfiniteScroll';

class Trending extends React.Component {
  render() {
    const { onInfiniteScroll, isSearchLoading, isActive } = this.props;
    return (
      <div>
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

  componentDidMount() {
    // with no search term
    this.props.onSearchSubmitted();
  }
}
export default Trending;

Trending.propTypes = {
  onSearchSubmitted: PropTypes.func.isRequired,
  onInfiniteScroll: PropTypes.func.isRequired,
  isSearchLoading: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired
};
