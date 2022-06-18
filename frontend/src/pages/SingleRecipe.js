import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Grid from '@mui/material/Grid'

import Hero from '../components/Hero'
import Sidebar from '../components/Sidebar'
import Steps from "../components/Steps"
import { API_URL } from "../utils/utils"
import Loader from "../components/Loader"
import loading from "../reducers/loading"


export default function SingleRecipe() {
  const { recipeId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState({})

  const isLoading = useSelector((store) => store.loading.isLoading)
  console.log(recipeId)
  useEffect(() => {
    dispatch(loading.actions.setLoading(true))
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": accessToken,
      },
    }

    fetch(API_URL(`recipes/recipe/${recipeId}`), options)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.response)
        dispatch(loading.actions.setLoading(false))
      })
  }, [])


  if (isLoading || Object.keys(recipe).length === 0) {
    return <Loader />
  }

  return (
    <>
      <Hero recipe={recipe} />
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <Sidebar recipe={recipe} />
        <Steps recipe={recipe} />
        <button onClick={() => navigate(`/recipes/${recipe._id}/edit`)}>Edit</button>
      </Grid>
    </>
  )
}