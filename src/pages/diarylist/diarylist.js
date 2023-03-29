import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { prisma } from '../../../server/db/client'
import axios from 'axios'
import Head from 'next/head'
import TopBar from '../../component/top_bar';
import SideMenu from '../../component/SideMenu';
import { MyPosts } from '../../pages/index';
import UserName from '../../component/UserName';
import Weather from '../../pages/api/weather';
import Footer from '../../component/footer';

export async function getServerSideProps() {
  try{
    const posts = await prisma.post.findMany()
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        posts: [],
      }
    }
  }
}

// const Diarylist = () => <MyPosts />;
export default function Diarylist({ posts, fontFamily, fontSize }){

  // Extract weather string from post content
  {posts.map((post) => {
    const contentLines = post.content.split('\n');
    const weatherLine = contentLines.find((line) => line.startsWith('Weather: '));
    const weather = weatherLine ? weatherLine.slice(9) : '';
    // ...
  })}

  return (
    <div
      className={`${styles.wrapper} ${styles.wrapper_diarylist}`}
      >
      <Head>
        <title>Miood - Diary List</title>
        <meta name="description" content="A diary app that you can write everyday event" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />

      <SideMenu />

      <main className={styles.main}>
        <div className={styles.wrapper_main}>
          <h1 className={styles.ttl_page}>List of  Diary</h1>

          {/* <MyPosts posts={posts} /> */}
          <ul className={styles.post_list}>
            {posts.map((post) => (
              <li key={post.id} className={styles.post_listitem}>
                <div className={styles.postWrapper}>
                  <div className={styles.postCont}>
                    <a  className={styles.postLink} href="">
                      <h2 >{post.title}</h2>
                        {post.content.split(',').map((line, index) => {
                          if (line.trim() !== '') {
                            if (index === 0) {
                              return <p  className={styles.postLine} key={index}>
                                <span className={styles.postLine_ttl}>Date: </span>
                                <span className={styles.postLine_cont}>{line}</span>
                              </p>;
                            } else if (index === 1) {
                              return <p  className={styles.postLine} key={index}>
                                <span className={styles.postLine_ttl}>Weather: </span>
                                <span className={styles.postLine_cont}>{line}</span>
                              </p>;
                            } else if (index === 2) {
                              return <p  className={styles.postLine} key={index}>
                                <span className={styles.postLine_ttl}>News: </span>
                                <span className={styles.postLine_cont}>{line}</span>
                              </p>;
                            } else if (index === 3) {
                              return <p  className={styles.postLine} key={index}>
                                <span className={styles.postLine_ttl}>Quote: </span>
                                <span className={styles.postLine_cont}>{line}</span>
                              </p>;
                            } else if (index === 4) {
                              return <p  className={styles.postLine} key={index}>
                                <span className={styles.postLine_ttl}>Your Day: </span>
                                <span className={styles.postLine_cont}>{line}</span>
                              </p>;
                            }
                          }
                          return null;
                        })}
                    </a>

                    <div className={styles.postFooter}>
                      <UserName userId={post.authorId} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </main>
    </div>
  )
}
