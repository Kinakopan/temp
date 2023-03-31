import styles from '../../src/styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { prisma } from '../../server/db/client'
import axios from 'axios'
import Head from 'next/head'
import TopBar from '../component/top_bar';
import SideMenu from '../component/SideMenu';
import { News } from '../pages/api/news';
import SaveBtn from '../component/Save_btn';
import Footer from '../component/footer';

export default function Home({posts}) {
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);

  // Get Today's Date
  var today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()]

  today = today.getFullYear() + ' ' + month + ' ' + String(today.getDate()) + ' ' + day;

  // News API
  const [newsAreaContent, setNewsAreaContent] = useState('');

  // Save the title and content into the server
  const apiKey = "4551243115444ba0a100a9567cd1b61d"
  const url = `https://newsapi.org/v2/everything?q=tesla&from=2022-12-17&sortBy=publishedAt&apiKey=${apiKey}`
  console.log(url);
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [textContent, setTextContent] = useState('')
  const [diaryEntry, setDiaryEntry] = useState('');

  // Save button - form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isReadyToSave) {
      const content = `
        ${today},
        ${textContent},
        ${newsAreaContent},
      `;
      setContent(content);
      setDiaryEntry(content);
      const res = await axios.post('/api/posts', { title, content });
      console.log(res.data);
      setIsReadyToSave(false);
    }
  }

  // Save button
  function handleSave() {
    setIsReadyToSave(true);
  }

  // Select button - News Article
  function handleNewsSelect(name, content) {
    console.log(`Saving article: ${name}, ${content}`);
    setSavedArticles([...savedArticles, {name, content}]);
    setNewsAreaContent(`${name}\n\n${content}\n\n`);
    setIsReadyToSave(true);
  };

  return (
    <div
      className={`${styles.wrapper} ${styles.wrapper_home_1}`}
      >
      <Head>
        <title>Miood Diary</title>
        <meta name="description" content="A diary app that you can write everyday event" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <TopBar />

      <SideMenu />

      <main className={styles.main}>
        <div className={styles.wrapper_main}>
          <form
            className={`${styles.paper} ${styles.form}`}
            onSubmit={handleSubmit}
            >

            <div className={styles.container_diaryHead}>
              <input
                type="text"
                value={title}
                className={styles.ttl_diaryTitle}
                placeholder="Entry Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              {/*------------ Info bar ----------- */}
              <div className={styles.infoBar}>
                <div className={`${styles.date} ${styles.icon}`}>
                  <img style={{padding:2, marginRight:10}} src="/icons/calender.png" />
                  {today}
                </div>
                <div className={styles.infoBar_right}>
                  <News handleSave={handleNewsSelect} />
                </div>
              </div>
            </div>

            <textarea
              disabled
              value={newsAreaContent}
              className={`${styles.content_api} ${styles.content_news}`}
              placeholder="Today's News"
              />

            <textarea
              value={textContent}
              className={styles.textarea_diaryContent}
              placeholder="Write about your day"
              onChange={(e) => setTextContent(e.target.value)}
              />

            <SaveBtn handleSave={handleSave}/>
          </form>
        </div>
        <Footer />
      </main>

    </div>
  )
}


export async function getServerSideProps() {
  const posts = await prisma.post.findMany()

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  }
}

export const MyPosts = (props ) => {
  const { posts } = props;
  return (
    <ul
      className={styles.post_list}>
      {posts.map((post) => (
        <li
          key={post.id}
          className={styles.post_listitem}>
          <a href="">
            <p>{}</p>
            <h2>{post.title}</h2>
            <p className={styles.post_contentstyle}>{post.content}</p>
          </a>
        </li>
      ))}
    </ul>
  )
}
