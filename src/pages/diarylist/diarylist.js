import styles from '@/src/styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { prisma } from '@/server/db/client'
import axios from 'axios'
import Head from 'next/head'
import TopBar from '@/src/component/Top_bar';
import SideMenu from '@/src/component/SideMenu';
import { MyPosts } from '@/src/pages/index';
import UserName from '@/src/component/UserName';
import Weather from '@/src/pages/api/weather';
import Footer from '@/src/component/Footer';

const WEATHER_ICON_MAP = {
  'Thunderstorm': 'https://cdn-icons-png.flaticon.com/512/2280/2280689.png',
  'Drizzle': 'https://cdn-icons-png.flaticon.com/512/3127/3127605.png',
  'Rain': 'https://cdn-icons-png.flaticon.com/512/3127/3127605.png',
  'Snow': 'https://cdn-icons-png.flaticon.com/512/3127/3127633.png',
  'Clear': 'https://cdn-icons-png.flaticon.com/512/3149/3149190.png',
  'Clouds': 'https://cdn-icons-png.flaticon.com/512/3127/3127645.png',
  'Mist': 'https://cdn-icons-png.flaticon.com/512/3692/3692768.png',
  'Smoke': 'https://cdn-icons-png.flaticon.com/512/3692/3692754.png',
  'Haze': 'https://cdn-icons-png.flaticon.com/512/3692/3692758.png',
  'Dust': 'https://cdn-icons-png.flaticon.com/512/3692/3692756.png',
  'Fog': 'https://cdn-icons-png.flaticon.com/512/3692/3692762.png',
  'Sand': 'https://cdn-icons-png.flaticon.com/512/3692/3692764.png',
  'Ash': 'https://cdn-icons-png.flaticon.com/512/3692/3692752.png',
  'Squall': 'https://cdn-icons-png.flaticon.com/512/2280/2280717.png',
  'Tornado': 'https://cdn-icons-png.flaticon.com/512/2280/2280730.png',
};

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
export default function Diarylist({ posts }){

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
                      <h2>{post.title}</h2>
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
