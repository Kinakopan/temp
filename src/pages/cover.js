import styles from '@/src/styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Lottie from 'lottie-react'
import animationData from '@/arrow.json';
import UserName from '@/src/component/UserName';
import TopBar from '@/src/component/Top_bar';


export default function CoverPage() {

  const [coverIndex, setCoverIndex] = useState(0);
  const coverImages = ['cover/cover(beige).png', 'cover/cover(pink).png', 'cover/cover(navy).png'];

  function changeBackgroundImage() {
    if (bgIndex === bgImages.length - 1) {
      setBgIndex(0);
    } else {
      setBgIndex(bgIndex + 1);
    }
  }

  return (
    <div className={`${styles.wrapper} ${styles.wrapper_cover}`}>
      <Head>
        <title>Miood Diary - Cover Page</title>
        <meta name="description" content="Miood Diary - Cover Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <TopBar />
      <div style={{position:"relative", width:"100vw"}}>
        <img className={styles.shadow} src="cover/shadow.png" alt="shadow" />
        <div className={styles.cover_title}><UserName /><br/> Diary</div>
        <p className={styles.new_entry}>Click the pen<br/>to start a new entry</p>
        <Link
            href="/"
            className={styles.pen_container}>
              <img className={styles.pen} style={{padding:3}} src="cover/pen.png"/>
        </Link>
        <Lottie animationData={animationData}
                loop={true}
                autoplay={true}
                speed={0.5}
                className={styles.arrow_lottie}
        />

        <img className={styles.cover_image} src="cover/cover(navy).png" alt="diary cover" />
      </div>
    </div>

  )
}
