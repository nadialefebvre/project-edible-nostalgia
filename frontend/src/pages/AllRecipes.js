import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import FilterListIcon from '@mui/icons-material/FilterList';
import DirectionsIcon from '@mui/icons-material/Directions'
import InputAdornment from '@mui/material/InputAdornment'

import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Link from '@mui/material/Link'

import { API_URL } from "../utils/urls"
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
  }, [recipes])

  const [inputSearch, setInputSearch] = useState("")

  const onRecipeSearch = (e) => {
    setInputSearch(e.target.value)
  }

  const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(inputSearch.toLowerCase()) ||
    recipe.category.toLowerCase().startsWith(inputSearch.toLowerCase()))


  // if (isLoading) {
  //   return <Loader />
  // }

  // useEffect(() => {
  //   dispatch(loading.actions.setLoading(true))
  // }, [])

  return (
    <>
      <Hero hero={hero} />
      <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 320 }}>
        <InputBase
          sx={{ ml: 1, flex: 1, p: '4px' }}
          placeholder="Filter the recipes (title or category)"
          inputProps={{ 'aria-label': 'filter the recipes' }}
          startAdornment={<InputAdornment position="start"><FilterListIcon /></InputAdornment>}
          onChange={onRecipeSearch}
        />
      </Paper>
      <Grid container spacing={4} marginTop={1}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.title} recipe={recipe} />
        ))}
      </Grid>
    </>
  )
}

export default AllRecipes
