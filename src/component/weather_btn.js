import styles from '@/src/styles/Home.module.css'

export default function ShowWeatherBtn(props) {
  return (
  <button
    onClick={props.showWeatherHandler} className={styles.icon}
    style={{
      alignSelf:"flex-end",
      cursor: "pointer"
    }}>
    <img src="/icons/weather_icon.png" />
  </button>);
}
