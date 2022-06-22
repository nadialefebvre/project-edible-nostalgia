import React from "react"

import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"

import Hero from "../components/Hero"

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
          You tried to access a page you are not authorized to. If you don't have
          a profile, please create one to use all functionalities. If you have a
          profile, you may land here if you try to edit a recipe that isn't yours.
        </Typography>
      </Grid>
    </>
  )
}

export default AccessDenied
