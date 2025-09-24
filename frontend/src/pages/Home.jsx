import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import NewsLetter from '../components/NewsLetter'
import Banner from '../components/Banner'
import Discount from '../components/Discount'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Categories />
      <Discount/>
      <Banner/>
      <BestSeller/>
      <NewsLetter />
      
    </div>
  )
}

export default Home
