import React from 'react'

import Hero from '../Component/Hero'
import Logo from '../Component/Logo'
import Third from '../Component/Third'
import { Bubbles } from 'lucide-react'
import FeatureCards from '../Component/Feature'
import SpiralBrands from '../Component/Spiral'
import CurvedImageScroll from '../Component/Graphics'
import ServicesComponent from '../Component/Service'
import OurWork from '../Component/OurWork'
import ReviewSection from '../Component/Review'
import Client from '../Component/Client'
import FAQSection from '../Component/FAQ'
import Footer from '../Component/Footer'
import Contact from '../Component/Contact'




function Home() {
  return (
     <>
      <Hero />
       <div className="flex  items-center justify-center">
      <Logo />
      </div>  
      <Third /> 
      <FeatureCards />
      <SpiralBrands />
      <CurvedImageScroll/> 
      <ServicesComponent />
      <OurWork />
      <ReviewSection />
      <Contact/>
      <Client />
      <FAQSection />
      <Footer/>
      
      
          </>
  )
}

export default Home