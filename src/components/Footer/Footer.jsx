import React from 'react'
import styles from './Footer.module.css'
function Footer() {
   return (
      <div className={styles.footer}>
         <div className={styles.footer__wrapper}>
            <div className={styles.footer__links}>
               <span className={styles.link__title}>Flash API</span>
               <a href="/">Get started</a>
               <a href="/">Documentation</a>
               <a href="/">News Sources</a>
            </div>
            <div className={styles.footer__links}>
            <span className={styles.link__title}>Product</span>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of service</a>
            </div>
            <div className={styles.footer__links}>
            <span className={styles.link__title}>Support</span>
            <a href="/">Contact</a>
            <a href="/">Github</a>
            <a href="/">LinkedIn</a>
            <a href="/">Instagram</a>
            </div>
            
         </div>
      </div>
   )
}

export default Footer
