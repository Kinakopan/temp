import styles from '@/src/styles/Home.module.css'

export default function KeywordInput(props) {

  return (
    <>
      <div className={styles.row}>
          <input className={styles.text_location}
              value={props.location}
              onChange={props.setArticleChange}
              placeholder="Enter News Keyword"
              onKeyDown={props.searchLocation}
              type="text"
            />
      </div>
    </>
  )
}
