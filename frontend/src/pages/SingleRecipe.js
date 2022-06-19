import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import Hero from '../components/Hero'
import Sidebar from '../components/Sidebar'
import StepsSection from "../components/StepsSection"
import { API_URL } from "../utils/urls"
import Loader from "../components/Loader"
import loading from "../reducers/loading"
import Confirm from "../components/Confirm"
import EditDelete from "../components/EditDelete"

const SingleRecipe = () => {
  const { recipeId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState({})

  const isLoading = useSelector((store) => store.loading.isLoading)
  const accessToken = useSelector((store) => store.user.accessToken)

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

  const handleDeleteRecipe = (recipeId) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken,
      },
    }

    fetch(API_URL(`recipes/recipe/${recipeId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Recipe has been deleted")
          navigate("/recipes")
        } else {
          alert(data.response.message)
        }
      })
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }


  if (isLoading || Object.keys(recipe).length === 0) {
    return <Loader />
  }

  return (
    <>
      <Hero hero={recipe} />
      {accessToken &&
        <EditDelete
          editPath={`/recipes/${recipe._id}/edit`}
          openAction={handleClickOpen}
          open={open} setOpen={setOpen}
          handleDelete={handleDeleteRecipe}
          itemId={recipe._id}
          title={"Delete this recipe?"}
          text={"Click to confirm that you want to delete this recipe."}
        />
      }
      <Grid container spacing={5}>
        <Sidebar recipe={recipe} />
        <StepsSection recipe={recipe} />
      </Grid>
    </>
  )
}

export default SingleRecipe
