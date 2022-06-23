import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"

import Hero from "../components/Hero"

const Home = ({ hero }) => {

  return (
    <>
      <Hero hero={hero} />
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          Edible nostalgia
        </Typography>
        <Divider />
        <Typography variant="p" paragraph>
          Food holds a special place in our brain, as it is deeply connected to
          all our reminiscences. Collect your precious recipes here, and share
          them with the world if you wish.
        </Typography>
        <Typography variant="p" paragraph>
          You are welcome to discover and filter all recipes made public by the
          users and you can easily create your own profile to be able to rate them,
          add your own recipes that you can edit if needed. You can then sort them
          in a convenient table on your profile page. All recipes are printable (on
          paper or PDF) without the image, header and footer.
        </Typography>
        <Typography variant="p" paragraph>
          Click on the three dots on top right corner to find everything you need.
        </Typography>
        <Typography variant="p" sx={{ fontStyle: "italic" }}>
          This web app built with MongoDB, Express, Node.js, React, Redux, React
          Router and Material UI is my final project for Technigo's frontend
          development bootcamp.
        </Typography>
      </Grid>
    </>
  )
}

export default Home
