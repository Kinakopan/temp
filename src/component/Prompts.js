import { useState } from "react";
import styles from '@/src/styles/Home.module.css'
import data from "@/src/data/Prompts.json";


export default function Prompts(props){

  let promptsNum = data.length;

  const [selectedIndex, setSelectedIndex] = useState(
    Math.floor(Math.random() * promptsNum) + 1
  );
  const [author, setAuthor] = useState(data[selectedIndex]?.author);
  const [sentence, setSentence] = useState(data[selectedIndex]?.sentence);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [barIsOpen, setBarIsOpen] = useState(false);

  function generateQuote() {
    setSelectedIndex(Math.floor(Math.random() * promptsNum) + 1);
    setAuthor(data[selectedIndex]?.author);
    setSentence(data[selectedIndex]?.sentence);
    // setSavedPrompt(`${data[selectedIndex]?.sentence}\n\n--${data[selectedIndex]?.author}`);
  }

  function handleSave() {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const prompt = prompts[randomIndex];
    setSavedPrompts(prevPrompts => [...prevPrompts, prompt]);
    setPrompt(prompt);
    setBarIsOpen(false);
    setSavedPrompt([...savedPrompts, prompt]);
  }

  function showBtnHandler() {
    if (barIsOpen) {
      setBarIsOpen(false);
    } else {
      setBarIsOpen(true);
    }
  }

  return (
    <div className={styles.wrapper_prompt}>
      <button
        className={styles.btn_popup_close}
        onClick={showBtnHandler}>
          <span dangerouslySetInnerHTML={{__html: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 5L5 15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M5 5L15 15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>'}} />
      </button>

      <div className={styles.cont_prompt_left}>
        <p>"{sentence}"</p>
        <p>--{author}</p>
    </div>

    <div className={styles.cont_prompt_right}>
      <button
        className={`${styles.icon} ${styles.icon_changePrompt}`}
        onClick={generateQuote}
        >
        <img style={{padding:4}} src="/icons/change.png" />
      </button>

      <button
        className={styles.btn_popup_save}
        onClick={() => props.setSavedPrompt(`${sentence}\n\n--${author}`)}>Save
      </button>
    </div>
  </div>
  );
}
