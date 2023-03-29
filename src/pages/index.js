import styles from '@/src/styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { prisma } from '@/server/db/client'
import axios from 'axios'
import Head from 'next/head'
import TopBar from '@/src/component/Top_bar';
import SideMenu from '@/src/component/SideMenu';
import { News } from '@/src/pages/api/news';
import Weather from '@/src/pages/api/weather';
import ShowWeatherBtn from '@/src/component/weather_btn';
import LocationInput from './api/location_input';
import Prompts from '@/src/component/Prompts';
import ShowPromptsBtn from '@/src/component/Prompts_btn';
import SaveBtn from '@/src/component/Save_btn';
import Footer from '@/src/component/Footer';

export default function Home({posts}) {
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [savedPrompts, setSelectPrompts] = useState([]);

  // Get Today's Date
  var today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()]

  today = today.getFullYear() + ' ' + month + ' ' + String(today.getDate()) + ' ' + day;

  // News API
  const [newsAreaContent, setNewsAreaContent] = useState('');

  // Weather API
  const [weatherAreaContent, setWeatherAreaContent] = useState('');
  const [location, setLocation] = useState('');
  const [data,setData] = useState({});
  const [weather, setWeather] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  var weatherApiKey = "95cd390841f1bbe052afd1a88c4fd163"
  var weatherLang = "en";
  var weatherUnits = "metric";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${weatherUnits}&appid=${weatherApiKey}&lang=${weatherLang}`

  const searchLocation = (event) => {
    if(event.key === "Enter") {
      axios.get(weatherUrl)
      .then((response)=>{
        console.clear();
        setData(response.data)
        console.log(response.data);
        setWeather(response.data.weather);
        setErrorMessage("")
      }).catch(err => {
        console.log(err);
        setErrorMessage("Please enter another location.")
        setData({})
        setWeather
      })
      event.preventDefault();
      setLocation('')
    }
  }

  function setLocationChange(event) {
    setLocation(event.target.value)
  }

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
        ${weather ? weather.map(w => `${w.main}: ${w.description}`).join('\n') : ''},
        ${newsAreaContent},
        ${savedPrompts},
        ${textContent}
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

  // Select button - Prompt
  function setSelectPrompt(props) {
    setSelectPrompts(props);
    setIsReadyToSave(false);
  }

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

  // Weather button
  const [weatherIsOpen, setWeatherIsOpen] = useState(false);

  function showWeatherHandler() {
    if (weatherIsOpen) {
      setWeatherIsOpen(false);
    } else {
      setWeatherIsOpen(true);
    }
  }

  // Prompts button
  const [barIsOpen, setBarIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');

  function showBtnHandler() {
    if (barIsOpen) {
      setBarIsOpen(false);
    } else {
      setBarIsOpen(true);
    }
  }

  function closePopup() {
    setWeatherIsOpen(false);
    setBarIsOpen(false);
  }

  // Font family picker
  const [fontFamily, setFontFamily] = useState('Helvetica');
  const handleFontChange = (newFont) => {
    setFontFamily(newFont);
  };

  const [showDropdown, setShowDropdown] = useState(false);
  function handleClick () {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  // Font size picker
  const [fontSize, setFontSize] = useState('18px');
  const handleFontSizeChange = (newFontSize) => {
    setFontSize(newFontSize);
  };

  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  function handleSizeClick () {
    if (showSizeDropdown) {
      setShowSizeDropdown(false);
    } else {
      setShowSizeDropdown(true);
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${styles.wrapper_home_1}`}
      style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
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
          {/*------------ Change BG button ----------- */}
          <button className={styles.bg_button} onClick={changeBackgroundImage}>
            <img src="/icons/brush.png" alt=""/>
            <div className={styles.tooltip_content}>
              Change Background
            </div>
          </button>

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

                  <div
                    className={styles.wrapper_weahterBtn}>
                    <ShowWeatherBtn
                      showWeatherHandler={showWeatherHandler}
                    />

                    {/*------------ Location input ----------- */}
                    <div className={styles.location_container}>
                      {weatherIsOpen && <LocationInput
                        onClose={closePopup}
                        location={location}
                        setLocationChange={setLocationChange}
                        searchLocation={searchLocation}
                      />}
                    </div>
                  </div>

                  <ShowPromptsBtn
                    showBtnHandler={showBtnHandler}
                  />

                  {/*------------ Prompts area ----------- */}
                  <div className={styles.prompts_bar}>
                    {barIsOpen && <Prompts
                      onClose={closePopup}
                      setSelectPrompt={setSelectPrompt} />}
                  </div>
                </div>
              </div>
            </div>

            <Weather
              weather={weather}
              data={data}
            />

            <textarea
              disabled
              style={{ fontFamily: fontFamily, fontSize: fontSize }}
              // value={savedPrompts.join('\n\n')}
              value={savedPrompts}
              className={`${styles.content_api} ${styles.content_prompt}`}
              placeholder="Today's Quote"
              />

            <textarea
              disabled
              style={{ fontFamily: fontFamily, fontSize: fontSize }}
              // value={newsAreaContent.join('\n\n')}
              value={newsAreaContent}
              className={`${styles.content_api} ${styles.content_news}`}
              placeholder="Today's News"
              />

            {/*------------ Font picker ----------- */}
            <div className={styles.tool_bar}>
              {/*------------ Font Family ----------- */}
              <div className={styles.fontPicker_container}>
                <p style={{ fontFamily: fontFamily, width:160}}>
                  {fontFamily}
                </p>
                <img
                  className={styles.icon}
                  style={{ width:15, height:10, cursor: "pointer" }}
                  src="/icons/arrow_down.png"
                  alt="arrow_down"
                  onClick={handleClick}
                />

                {showDropdown && (
                  <>
                    <div className={styles.dropdown_menu}>
                      <ul className={styles.list}>
                        <li style={{width:"100%"}}>
                          <button
                            onClick={() => handleFontChange('Helvetica')}
                            style={{ fontFamily:"Helvetica", cursor: "pointer" }}
                            className={styles.font_btn}
                          >Helvetica</button>
                        </li>
                        <li style={{width:"100%"}}>
                          <button
                            onClick={() => handleFontChange('Times New Roman')}
                            style={{ fontFamily:"Times New Roman", cursor: "pointer" }}
                            className={styles.font_btn}
                          >Times New Roman</button>
                        </li>
                        <li style={{width:"100%"}}>
                          <button
                            onClick={() => handleFontChange('Raleway')}
                            style={{ fontFamily:"Raleway", cursor: "pointer" }}
                            className={styles.font_btn}
                          >Raleway</button>

                        </li>
                        <li style={{width:"100%"}}>
                          <button
                            onClick={() => handleFontChange('Kalam')}
                            style={{ fontFamily:"Kalam", cursor: "pointer" }}
                            className={styles.font_btn}
                          >Kalam</button>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
              {/*------------ Font Size ----------- */}
              <div
                className={styles.fontPicker_container}
                style={{ borderLeft:"1px solid white", marginLeft:15 }}>
                <p style={{ width:100 }}>
                  {fontSize}
                </p>
                <img
                  className={styles.icon}
                  style={{ width:15, height:10, cursor: "pointer" }}
                  src="/icons/arrow_down.png"
                  alt="arrow_down"
                  onClick={handleSizeClick}
                />

                {showSizeDropdown && (
                  <>
                    <div className={styles.dropdown_menu} style={{width:100}}>
                      <ul className={styles.list}>
                        <li style={{width:"100%"}}>
                          <button
                            onClick={() => handleFontSizeChange('16px')}
                            style={{ fontSize:"16px", cursor: "pointer" }}
                            className={styles.font_btn}
                          >16px</button>
                        </li>
                        <li style={{width:"100%"}}>
                          <button
                            onClick={() => handleFontSizeChange('18px')}
                            style={{ fontSize:"18px", cursor: "pointer" }}
                            className={styles.font_btn}
                          >18px</button>
                        </li>
                        <li style={{width:"100%"}}>
                          <button
                            onClick={() => handleFontSizeChange('24px')}
                            style={{ fontSize:"24px", cursor: "pointer" }}
                            className={styles.font_btn}
                          >24px</button>

                        </li>
                        <li style={{width:"100%"}}>
                          <button
                            onClick={() => handleFontSizeChange('32px')}
                            style={{ fontSize:"32px", cursor: "pointer" }}
                            className={styles.font_btn}
                          >32px</button>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>

            <textarea
              style={{ fontFamily: fontFamily, fontSize: fontSize }}
              value={textContent}
              className={styles.textarea_diaryContent}
              placeholder="Write about your day"
              onChange={(e) => setTextContent(e.target.value)}
              // onChange={handleContentChange}
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

export const MyPosts = (props) => {
  const { posts } = props;

  return (
    <ul className={styles.post_list}>
      {posts.map((post) => (
        <li
          key={post.id}
          className={styles.post_listitem}>
          <a href="">
            <p>{}</p>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </a>
        </li>
      ))}
    </ul>
  )
}

// export const MyPosts = (props) => {
//   const { posts } = props;

//   const addWeatherIcon = (post) => {
//     const weather = post.weather && post.weather[0];
//     const weatherIcon = weather && WEATHER_ICON_MAP[weather.main];
//     return (
//       <div className={styles.weatherIcon}>
//         {weatherIcon && <img src={weatherIcon} alt={weather.main} />}
//       </div>
//     );
//   };

//   return (
//     <ul className={styles.post_list}>
//       {posts.map((post) => (
//         <li key={post.id} className={styles.post_listitem}>
//           <a href="">
//             {addWeatherIcon(post)}
//             <h2>{post.title}</h2>
//             <p>{post.content}</p>
//           </a>
//         </li>
//       ))}
//     </ul>
//   );
// };
