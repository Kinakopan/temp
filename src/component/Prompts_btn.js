import styles from '@/src/styles/Home.module.css'

export default function ShowPromptsBtn(props) {
  return (
  <button onClick={props.showBtnHandler} className={styles.icon} style={{alignSelf:"flex-end", position:"relative", cursor:"pointer"}}>
    <img src="/icons/bulb.png" />
    <div className={styles.tooltip_content} style={{left:"-80%",
  top:45 ,minWidth:"7rem"}}>
    Get Prompts
    </div>
  </button>);
}

