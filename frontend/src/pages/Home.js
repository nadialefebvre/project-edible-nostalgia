import React from "react"
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import Hero from '../components/Hero'

const Home = ({hero}) => {

  return (
    <>
      <Hero hero={hero} />
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          Edible nostalgia
        </Typography>
        <Divider />
        <Typography variant="p">
        Food holds a special place in our brain, as it is deeply connected to 
        all our reminiscences. Collect your precious recipes here, and share 
        them with the world if you wish.
        </Typography>
      </Grid>
    </>
  )
}

export default Home
