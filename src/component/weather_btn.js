import styles from '@/src/styles/Home.module.css'

export default function ShowWeatherBtn(props) {
  return (
    <button
      onClick={props.showWeatherHandler}
      className={styles.icon}
      style={{alignSelf:"flex-end", position:"relative" ,cursor:"pointer"}}>

      <img
        src="/icons/weather_icon.png"
        style={{padding:"3px 0px"}}
      />
      <div
        className={styles.tooltip_content}
        style={{left:"-80%", top:45 ,minWidth:"7rem"}}
        >
        Get Weather
      </div>
    </button>
  );
}
