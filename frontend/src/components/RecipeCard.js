import * as React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Link, useNavigate } from "react-router-dom"

const RecipeCard = (props) => {
  const { recipe } = props
  const navigate = useNavigate()


  return (
    <Grid item xs={12} md={6}>
      <CardActionArea onClick={() => navigate(`/recipes/${recipe._id}`)} component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {recipe.title}
            </Typography>
            <Typography variant="subtitle1" paragraph color="text.secondary">
              {recipe.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={recipe.image}
            alt={recipe.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export default RecipeCard