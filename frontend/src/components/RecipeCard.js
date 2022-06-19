import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'

import loading from "../reducers/loading"

const RecipeCard = (props) => {
  const { recipe } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoading = useSelector((store) => store.loading.isLoading)

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea onClick={() => navigate(`/recipes/${recipe._id}`)} component="a" href="#">
        {/* {isLoading ? <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }}/> : */}

          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {recipe.title}
              </Typography>
              <Typography variant="subtitle1" paragraph color="text.secondary">
                {recipe.description}
              </Typography>
              {/* maybe remove "read more (and remove "paragraph" attribute to description) */}
              <Typography variant="subtitle1" color="primary">
                Read more...
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={recipe.image}
              alt={recipe.imageLabel}
            />
          </Card>
        {/* } */}
      </CardActionArea>
    </Grid>
  )
}

export default RecipeCard
