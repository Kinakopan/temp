import React from 'react';
import styles from '@/src/styles/Home.module.css';
import Weather from '@/src/pages/api/weather.js';

export default function WriteArea() {
  return (
  <div className={styles.background}>
    <div className={styles.paper}>
      <input className={styles.title}
      placeholder="Entry Title"
      ></input>
      <Weather></Weather>
      <input className={styles.type_area} type="text">
      </input>
    </div>
  </div>
  )

}
