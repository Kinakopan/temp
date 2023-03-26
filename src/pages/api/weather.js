import styles from '@/src/styles/Home.module.css'


export default function Weather(props) {

  return (
    <>
    {
      props.weather && props.weather.map((w,index) => {
        return (
          <div
            key={index}
            className={styles.wrapper_weather}
            >
            <div
              className={`${styles.row} ${styles.container_weather} ${styles.content_weather}`}>
              <div className={styles.city_name}>
                {props.data.name}
              </div>
              <div>
                <img
                src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`}
                alt={w.description}
                className={styles.icon}/>
              </div>
              <div>{props.data.main.temp_min.toFixed()}</div>
              <p> ~ </p>
              <div>{props.data.main.temp_max.toFixed()}°C</div>
          </div>
          </div>
        )
      })
    }
    </>
  )
}
