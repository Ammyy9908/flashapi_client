import React from 'react'
import styles from './Hero.module.css'
function Hero() {
   return (
      <div className={styles.hero}>
         <div className={styles.hero_centered}>
            <h2>Get Worldwide News by using &lt;ode/&gt; </h2>
            <h3>Locate articles and breaking news headlines from news sources and blogs across the web with our JSON API</h3>
            <button className={styles.get_api_btn}>Get API Key</button>
         </div>
      </div>
   )
}

export default Hero
