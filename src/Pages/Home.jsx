import React from 'react'

import Hero from '../Component/Hero'
import Logo from '../Component/Logo'
import Third from '../Component/Third'
import { Bubbles } from 'lucide-react'
import FeatureCards from '../Component/Feature'
import SpiralBrands from '../Component/Spiral'
import DesignShowcase from '../Component/Graphics'
import ServicesComponent from '../Component/Service'
import OurWork from '../Component/OurWork'




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
      <DesignShowcase />
      <ServicesComponent />
      <OurWork/>
      
          </>
  )
}

export default Home