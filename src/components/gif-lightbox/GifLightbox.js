import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './GifLightbox.css';
import * as CustomTypes from '../../lib/CustomTypes';

export default function GifLightbox({ isShown, gif, onUnselect }) {
  const containerClassNames = classNames(styles.container, {
    [styles.isShown]: isShown
  });

  return (
    <div className={containerClassNames} onClick={() => onUnselect()}>
      <img className={styles.image} src={gif.full} />
    </div>
  );
}

GifLightbox.propTypes = {
  isShown: PropTypes.bool.isRequired,
  gif: CustomTypes.SearchResult.isRequired,
  onUnselect: PropTypes.func.isRequired
};
