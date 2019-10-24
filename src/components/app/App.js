import React from 'react';
import Navigation from '../navigation/NavigationContainer';
import styles from './App.css';
import GifLightbox from '../gif-lightbox/GifLightboxContainer';

function App({ children }) {
  return (
    <div>
      <h1 className={styles.header}>GIF-Master</h1>
      <Navigation />
      {children}
      <GifLightbox />
    </div>
  );
}

export default App;
