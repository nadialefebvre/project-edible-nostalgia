import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import Hero from '../components/Hero'

const Error404 = ({hero}) => {
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
