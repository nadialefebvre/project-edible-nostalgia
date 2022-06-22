import React from "react"
import uniqid from "uniqid"

import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import PublicIcon from "@mui/icons-material/Public"
import PublicOffIcon from "@mui/icons-material/PublicOff"

const Sidebar = (props) => {
  const { recipe } = props

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
        {recipe.isPublic ?
          <PublicIcon fontSize="small" color="secondary" />
          :
          <PublicOffIcon fontSize="small" color="secondary" />
        }
        <Typography variant="h6" gutterBottom>
          {recipe.category}
        </Typography>
        <Typography>
          {recipe.servings} serving{recipe.servings > 1 && "s"}
        </Typography>
        <Typography>{recipe.bakingTime}</Typography>
      </Paper>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ mt: 3 }}
      >
        Ingredient{recipe.ingredients.length > 1 && "s"}
      </Typography>
      {recipe.ingredients.map((ingredient) => (
        <Typography
          display="block"
          variant="body1"
          key={uniqid()}
        >
          {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
        </Typography>
      ))}
    </Grid>
  )
}

export default Sidebar
