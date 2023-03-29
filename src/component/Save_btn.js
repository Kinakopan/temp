import styles from '../styles/SaveBtn.module.css'


export default function SaveBtn({ handleSave }) {
  return (
    // <div className={styles.save_btn_wrapper}>
    //   <a href="#" className={styles.my_super_cool_btn}>
    //     <div className={styles.dots_container}>
    //       <div className={styles.dot}></div>
    //       <div className={styles.dot}></div>
    //       <div className={styles.dot}></div>
    //       <div className={styles.dot}></div>
    //     </div>
    //     <span>Save</span>
    //   </a>
    // </div><nav>
    <button
      className={styles.btn}
      onClick={handleSave}
      id="btn">
      Save
      <span></span><span></span><span></span><span></span>
    </button>
  )
}
