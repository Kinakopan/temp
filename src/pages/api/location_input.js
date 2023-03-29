import { useState } from "react";
import styles from '../../styles/Home.module.css'

export default function LocationInput(props) {

  const [weatherIsOpen, setWeatherIsOpen] = useState(false);

  function onClose() {
    props.setWeatherIsOpen(false);
    props.onClose();
  }

  return (
    <>
      <div className={styles.row}>
        <button
          className={styles.btn_popup_close}
          onClick={props.onClose}>
            <span dangerouslySetInnerHTML={{__html: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 5L5 15" stroke="#de2c28" strokeWidth="2" strokeLinecap="round"/><path d="M5 5L15 15" stroke="#de2c28" strokeWidth="2" strokeLinecap="round"/></svg>'}} />
        </button>
        <input className={styles.text_location}
            value={props.location}
            onChange={props.setLocationChange}
            placeholder="Enter Location"
            onKeyDown={props.searchLocation}
            type="text"
          />
      </div>
    </>
  )
}
