import React from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import HeaderMobile from '../components/HeaderMobile/HeaderMobile'
import Hero from '../components/Hero/Hero'

function Home() {
   return (
      <div>
         <Header/>
         <HeaderMobile/>
         <Hero/>
         <Footer/>
      </div>
   )
}

export default Home
