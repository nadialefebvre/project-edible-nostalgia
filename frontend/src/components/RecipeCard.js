import React from "react"
import { useNavigate } from "react-router-dom"

import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Rating from "@mui/material/Rating"

import { imageToUse } from "../utils/urls"

const RecipeCard = (props) => {
  const { recipe } = props

  const navigate = useNavigate()

  const recipeRating =
    recipe.ratingCount > 0 ? Math.round(recipe.totalRating / recipe.ratingCount) : 0

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        component="a"
        href={`/recipes/${recipe._id}`}
        onClick={() => navigate(`/recipes/${recipe._id}`)}
      >
        <Card sx={{ display: "flex", height: 240 }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{ textTransform: "uppercase" }}
              color="text.secondary"
            >
              {recipe.category}
            </Typography>
            <Typography component="h2" variant="h5">
              {recipe.title}
            </Typography>

            <Typography
              variant="subtitle1"
              paragraph
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              {recipe.description}
            </Typography>

            <Rating
              readOnly
              size="small"
              value={recipeRating}
            />
          </CardContent>

          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={imageToUse(recipe.category)}
            alt={recipe.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export default RecipeCard
