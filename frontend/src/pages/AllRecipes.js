import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import FilterListIcon from '@mui/icons-material/FilterList'
import InputAdornment from '@mui/material/InputAdornment'
import Skeleton from "@mui/material/Skeleton"
import Grid from '@mui/material/Grid'

import { API_URL } from "../utils/urls"
import loading from "../reducers/loading"

import Hero from '../components/Hero'
import RecipeCard from "../components/RecipeCard"

const AllRecipes = ({ hero }) => {

  const dispatch = useDispatch()

  const isLoading = useSelector((store) => store.loading.isLoading)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    dispatch(loading.actions.setLoading(true))
    
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken,
      },
    }

    const slugToUse = accessToken ? `recipes/user/${userId}/public` : "recipes/public"

    fetch(API_URL(slugToUse), options)
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

  const [inputSearch, setInputSearch] = useState("")

  const onRecipeSearch = (e) => {
    setInputSearch(e.target.value)
  }

  const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(inputSearch.toLowerCase()) ||
    recipe.category.toLowerCase().startsWith(inputSearch.toLowerCase()))


  return (
    <>
      <Hero hero={hero} />
      <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 320 }}>
        <InputBase
          sx={{ ml: 1, flex: 1, p: '4px' }}
          placeholder="Filter the recipes (title or category)"
          inputProps={{ 'aria-label': 'filter the recipes' }}
          startAdornment={<InputAdornment position="start"><FilterListIcon color="secondary" /></InputAdornment>}
          onChange={onRecipeSearch}
        />
      </Paper>
      <Grid container spacing={4} marginTop={1}>
        {isLoading ? (
          <Grid item xs={12} md={6}>
                <Skeleton variant="rectangular" height={140} width="100%" animation="wave" />
          </Grid>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.title} recipe={recipe} />
          ))
        )}
      </Grid>
    </>
  )
}

export default AllRecipes
