import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

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
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          Error 404
        </Typography>
        <Divider />
        <Typography paragraph variant="p">
          Page not found, follow the breadcrumbs to reach the homepage.
        </Typography>
      </Grid>
    </>
  )
}

export default Error404
