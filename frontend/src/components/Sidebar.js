import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

const Sidebar = (props) => {
  const { recipe } = props

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          {recipe.servings} servings
        </Typography>
        <Typography>{recipe.bakingTime}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Ingredients
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