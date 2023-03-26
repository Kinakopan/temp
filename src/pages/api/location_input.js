import styles from '@/src/styles/Home.module.css'

export default function LocationInput(props) {

  return (
    <>
      <div className={styles.row}>
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
