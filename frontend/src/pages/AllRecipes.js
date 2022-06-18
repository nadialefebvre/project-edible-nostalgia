import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Link from '@mui/material/Link'

import { API_URL } from "../utils/utils"
import loading from "../reducers/loading"
import Loader from "../components/Loader"


import Hero from '../components/Hero'
import RecipeCard from "../components/RecipeCard"

const hero = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
}

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
]

const AllRecipes = () => {

  const dispatch = useDispatch()

  const isLoading = useSelector((store) => store.loading.isLoading)

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    dispatch(loading.actions.setLoading(true))
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": accessToken,
      },
    }

    fetch(API_URL(`recipes/all`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRecipes(data.response)
        } else {
          alert(data.response.message)
        }
        dispatch(loading.actions.setLoading(false))
      })
  }, [])

  if (isLoading) {
    return <Loader />
  }


  return (
    <>
      <Hero recipe={hero} />
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      <Grid container spacing={4}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.title} recipe={recipe} />
        ))}
      </Grid>
    </>
  )
}

export default AllRecipes
