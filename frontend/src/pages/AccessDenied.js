import React from "react"

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import Hero from '../components/Hero'

const AccessDenied = ({ hero }) => {

  return (
    <>
      <Hero hero={hero} />
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          Access denied
        </Typography>
        <Divider />
        <Typography paragraph variant="p">
          You are not authorized to access this page, please create an account
          to use all functionalities.
        </Typography>
      </Grid>
    </>
  )
}

export default AccessDenied
