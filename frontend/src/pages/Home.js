import React from "react"

import Hero from '../components/Hero'

const hero = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
}

const Home = () => {

  return (
    <Hero recipe={hero} />
  )
}

export default Home
