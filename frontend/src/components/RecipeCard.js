import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'
import Rating from '@mui/material/Rating'

import { imageToUse } from "../utils/urls"
import loading from "../reducers/loading"

const RecipeCard = (props) => {
  const { recipe } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoading = useSelector((store) => store.loading.isLoading)

  const recipeRating = recipe.totalRating / recipe.ratingCount

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea onClick={() => navigate(`/recipes/${recipe._id}`)} component="a" href={`/recipes/${recipe._id}`}>
        {/* {isLoading ? <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }}/> : */}

        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {recipe.title}
            </Typography>
            <Typography variant="subtitle1" paragraph color="text.secondary">
              {recipe.description}
            </Typography>
            <Rating
              readOnly
              precision={0.5}
              size="small"
              value={recipeRating}
            />
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={imageToUse(recipe.category)}
            alt={recipe.imageLabel}
          />
        </Card>
        {/* } */}
      </CardActionArea>
    </Grid>
  )
}

export default RecipeCard
