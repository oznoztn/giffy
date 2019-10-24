import React from 'react';
import PropTypes from 'prop-types';
import * as CustomTypes from '../../lib/CustomTypes';

// { result }: Extract the result from the props:
export default function SearchResult({ result, onResultSelection }) {
  const { thumbnail } = result;
  return <img src={thumbnail} onClick={() => onResultSelection(result)} />;
}

SearchResult.propTypes = {
  result: CustomTypes.SearchResult.isRequired,
  onResultSelection: PropTypes.func.isRequired
};
