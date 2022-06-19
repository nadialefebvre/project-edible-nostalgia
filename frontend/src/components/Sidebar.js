import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const Sidebar = (props) => {
  const { recipe } = props
  const navigate = useNavigate()

  useEffect(() => {
    if (recipe === undefined) {
      navigate("/error404")
    }
  })

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          {recipe.category}
        </Typography>
        <Typography>{recipe.servings} serving{recipe.servings > 1 && "s"}</Typography>
        <Typography>{recipe.bakingTime}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Ingredient{recipe.ingredients.length > 1 && "s"}
      </Typography>
      {recipe.ingredients.map((ingredient) => (
        <Typography display="block" variant="body1" key={ingredient.ingredient}>
          {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
        </Typography>
      ))}
    </Grid>
  )
}

export default Sidebar
