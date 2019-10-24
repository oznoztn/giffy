import React from 'react';
import PropTypes from 'prop-types';
import * as CustomTypes from '../../../lib/CustomTypes';
import Spinner from '../../spinner/Spinner';
import styles from './random.css';

class Random extends React.Component {
  componentDidMount() {
    this.props.onRandomGifRequested();
  }

  onFormSubmit(e) {
    e.preventDefault();

    this.props.onRandomGifRequested();
  }

  render() {
    const { isRandomGifLoading, onRandomGifClick } = this.props;
    const { gif } = this.props;
    return (
      <div className={styles.container} onSubmit={e => this.onFormSubmit(e)}>
        <input
          onClick={this.props.onRandomGifRequested}
          className={styles.button}
          type="submit"
          value="Next Random Gif"
        />
        <img
          className={styles.gif}
          href="#"
          src={gif.thumbnail}
          onClick={() => onRandomGifClick(gif)}
        />
        {isRandomGifLoading && <Spinner />}
      </div>
    );
  }
}

export default Random;

Random.propTypes = {
  isRandomGifLoading: PropTypes.bool.isRequired,
  gif: CustomTypes.SearchResult.isRequired,
  onRandomGifRequested: PropTypes.func.isRequired,
  onRandomGifClick: PropTypes.func.isRequired
};
