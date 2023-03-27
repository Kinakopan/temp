import styles from '@/src/styles/Home.module.css'
import { Inter } from '@next/font/google'
import { prisma } from '@/server/db/client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { MyPosts } from '@/src/pages/index';
import UserName from '@/src/component/UserName.js';

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

export default function DiaryList({posts}){

  return (
    <div
      className={`${styles.wrapper} ${styles.wrapper_home}`}
      >
      <Head>
        <title>Miood - Post</title>
        <meta name="description" content="A diary app that you can write everyday event" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.wrapper_main}>
          <h1 className={styles.ttl_page}>List of <UserName /> Diary</h1>

          <MyPosts posts={posts} />

          </div>
        </main>
      </div>
  )
}
