import styles from '@/src/styles/SideMenu.module.css'
import Link from 'next/link'
import UserName from '@/src/component/UserName.js';

// const PostList = () => <MyPosts />;
export default function SideMenu(){

  return (
    <div className={styles.wapper_sidemenu}>
      <ul className={styles.sidemenu_list}>
        <li className={styles.sidemenu_list_item}>
          <Link
            href=""
            className={styles.sidemenu_list_text}>
              <img style={{padding:2}} src="/icons/add.png"/>
              New Diary
          </Link>
          <span></span><span></span><span></span><span></span>
        </li>
        <li className={styles.sidemenu_list_item}>
          <Link
            href="/PostList/postlist"
            className={styles.sidemenu_list_text}>
              <img style={{padding:3}} src="/icons/list.png"/>
              Diary List
          </Link>
          <span></span><span></span><span></span><span></span>
        </li>
        <li className={styles.sidemenu_list_item}>
          <Link
            href="/cover"
            className={styles.sidemenu_list_text}>
              <img style={{padding:2}} src="/icons/book.png"/>
              Back To Cover
          </Link>
          <span></span><span></span><span></span><span></span>
        </li>
      </ul>

    </div>
  )
}
