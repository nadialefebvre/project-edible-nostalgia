import * as React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { imageToUse } from "utils/urls"

const Hero = (props) => {
  const { hero } = props

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        // backgroundImage: "https://images.unsplash.com/photo-1455732063391-5f50f4df1854?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        backgroundImage: `url(${imageToUse(hero.category)})`,
        // backgroundImage: `url(${hero.image})`,

      }}
    >
      {/* Increase the priority of the hero background image */}
      {/* {<img style={{ display: 'none' }} src="https://images.unsplash.com/photo-1455732063391-5f50f4df1854?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt={hero.title} />} */}
      {<img style={{ display: 'none' }} src={imageToUse(hero.category)} alt={hero.title} />}
      {/* {<img style={{ display: 'none' }} src={hero.image} alt={hero.title} />} */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" fontFamily="Meddon" gutterBottom>
              {hero.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {hero.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Hero