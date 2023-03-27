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

export default function DiaryList({ posts, diaryEntry }){
  const { weatherData } = diaryEntry;
  const parsedWeatherData = JSON.parse(weatherData);
  console.log('parsedWeatherData:', parsedWeatherData);
  console.log('weather:', parsedWeatherData.weather);
  const { name } = parsedWeatherData;
  const { icon, description } = parsedWeatherData.weather[0];
  const { temp_min, temp_max } = parsedWeatherData.main;

  // Change background button
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = ['cover/bedsheet.jpg', 'bg/bg_2.jpg', 'bg/bg_3.jpg', 'bg/bg_4.jpg', 'bg/bg_5.jpg', 'bg/bg_6.jpg'];

  function changeBackgroundImage() {
    if (bgIndex === bgImages.length - 1) {
      setBgIndex(0);
    } else {
      setBgIndex(bgIndex + 1);
    }
  }

  return (
    <div
      className={`${styles.wrapper} ${styles.wrapper_diarylist}`}
      style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
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
          {/*------------ Change BG button ----------- */}
          <button className={styles.bg_button} onClick={changeBackgroundImage}>
            <img src="/icons/brush.png" alt=""/>
            <div className={styles.tooltip_content}>
              Change Background
            </div>
          </button>

          <h1 className={styles.ttl_page}>List of  Diary</h1>

          <div className={styles.paper}>
            <div>
              <h1>Weather in {name}</h1>
              <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={description} />
              <p>Lowest Temperature: {temp_min}°C</p>
              <p>Highest Temperature: {temp_max}°C</p>
              {/* ... other code ... */}
            </div>

            <Weather />

            <MyPosts posts={posts} />
          </div>

        </div>
        <Footer />
      </main>
    </div>
  )
}
