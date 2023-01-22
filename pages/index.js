import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState();
  const [errorMessage, setErrorMessage] = useState('');


  let apiKey = "8194363f96ad5fe42294193fb37bd84f";
  let lang = "en";
  let units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url)
        .then((response) => {
          console.clear();
          setData(response.data) //stores data that comes back to us
          console.log(response.data)
          setWeather(response.data.weather)
          setErrorMessage("")
        }).catch(err => {
          console.log(err) //have to catch errors
          setErrorMessage("Please enter another location.")
          setData({})
          setWeather() //if any errors, it doesn't crash
        })
      setLocation(''); //clears location after?
    }
  }

  return (
    <>
      <Head>
        <title>Weather</title>
        <meta name="Weather" content="Weather" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.columnContainer}>
            <div className={styles.weatherChecker}>Weather Checker</div>
            <input className={styles.inputBox}
              value={location}
              onChange={event => setLocation(event.target.value)}
              placeholder="What city?"
              onKeyDown={searchLocation}
              type="text"
            />
            {errorMessage}
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.countryName}>{data.name}</div>
            {
              weather && weather.map((w, index) => {
                const icon = data.weather[0].icon;
                const src = `http://openweathermap.org/img/w/${icon}.png`;

                return (

                  <div key={index}>
                    <div className={styles.columnContainer}>
                      <Image loader={() => src} src={src} width={50} height={50} />
                      {/* <Image src={weatherIcon} width={100} height={100} /> */}
                      {/* <Image src={iconString} className={styles.weatherIcon} width={10} height={10} /> */}
                      <div className={styles.mainTemperature}>{data.main.temp} °C</div>
                      <div className={styles.feelsLike}>{data.main.feels_like} °C</div>
                      <div className={styles.windGust}>{data.wind.gust}</div>
                      <div className={styles.mainDescription}>{w.main}</div>
                      <div className={styles.weatherDescription}>{w.description}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </main>
    </>
  )
}
