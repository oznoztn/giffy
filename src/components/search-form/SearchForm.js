import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.css';

export default function SearchForm({ onSearchSubmitted }) {
  let searchField = null;

  const searchSubmitted = e => {
    e.preventDefault();

    onSearchSubmitted(searchField.value);
  };

  return (
    <form className={styles.container} onSubmit={searchSubmitted}>
      <input
        className={styles.searchField}
        type="text"
        ref={e => (searchField = e)}
        placeholder="Find me giphys"
      />
      <input className={styles.button} type="submit" value="Search" />
    </form>
  );
}

SearchForm.propTypes = {
  onSearchSubmitted: PropTypes.func.isRequired
};

// default değeri state'den çekebilirim
// bir arama gerçekleştiğinde state'i değiştiririm
// bir sonraki navigasyonda search box daki text resetlenmemiş olur
