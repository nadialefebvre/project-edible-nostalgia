import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Hero from '../components/Hero'

const hero = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
}

const Error404 = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/error404")
  }, [navigate])

  return (
    <>
      <Hero hero={hero} />

      <div>Not found</div>
    </>
  )
}

export default Error404
