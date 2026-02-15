import React from 'react'

// 1. REMOVED: import Header from '../Component/Header'; (It's likely already in App.jsx)

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
      {/* 2. REMOVED: <Header /> (This removes the duplicate) */}

      <Hero />
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <Third />
      <FeatureCards />
      <SpiralBrands />
      <DesignShowcase />
      <ServicesComponent />
      <OurWork />
    </>
  )
}

export default Home