import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import Snackbar from '@mui/material/Snackbar'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import Skeleton from "@mui/material/Skeleton"

import { API_URL } from "../utils/urls"
import loading from "../reducers/loading"
import Ingredient from "../components/Ingredient"
import Step from "../components/Step"


const categories = [
  {
    value: 'Christmas',
    label: 'Christmas',
  },
  {
    value: 'Childhood',
    label: 'Childhood',
  },
  {
    value: 'Birthday',
    label: 'Birthday',
  },
  {
    value: 'Homesick',
    label: 'Homesick',
  }
]

const bakingTimes = [
  {
    value: 'Quick and easy',
    label: 'Quick and easy',
  },
  {
    value: 'Squeezable between workday and bathtime',
    label: 'Squeezable between workday and bathtime',
  },
  {
    value: 'One day you will have the time',
    label: 'One day you will have the time',
  }
]

const RecipeForm = () => {

  const { recipeId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector((store) => store.loading.isLoading)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [bakingTime, setBakingTime] = useState("")
  const [servings, setServings] = useState("")
  const [ingredients, setIngredients] = useState([
    {
      quantity: "",
      unit: "",
      ingredient: "",
    }
  ])
  const [steps, setSteps] = useState([""])

  const [checked, setChecked] = useState(false)

  const handleChangePublic = (event) => {
    setChecked(event.target.checked)
  }


  useEffect(() => {
    if (!accessToken) {
      navigate("/accessdenied")
    }
  })


  if (recipeId) {
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
          setTitle(data.response.title)
          setDescription(data.response.description)
          setCategory(data.response.category)
          setBakingTime(data.response.bakingTime)
          setServings(data.response.servings)
          if (data.response.ingredients.length) {
            setIngredients(data.response.ingredients)
          }
          if (data.response.steps.length) {
            setSteps(data.response.steps)
          }
          setChecked(data.response.isPublic)
          dispatch(loading.actions.setLoading(false))
        })
    }, [])
  }



  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const handleSubmitRecipe = (event) => {
    event.preventDefault()
    dispatch(loading.actions.setLoading(true))
    const options = {
      method: `${recipeId ? "PATCH" : "POST"}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      },
      body: JSON.stringify({ title, description, category, bakingTime, servings, ingredients, steps, ratingCount: 0, totalRating: 0, isPublic: checked, addedBy: userId })
    }

    fetch(API_URL(`${recipeId ? `recipes/recipe/${recipeId}` : "recipes"}`), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (recipeId) {
            navigate(`/recipes/${recipeId}`)
          } else {
            setIsSnackbarOpen(true)
            setTitle("")
            setDescription("")
            setCategory("")
            setBakingTime("")
            setServings("")
            setIngredients([
              {
                quantity: "",
                unit: "",
                ingredient: "",
              }
            ])
            setSteps([""])
            setChecked(false)
          }
        } else {
          alert(data.response.message)
        }
        dispatch(loading.actions.setLoading(false))
      })
  }


  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target
    const ingredientsList = [...ingredients]
    ingredientsList[index][name] = value
    setIngredients(ingredientsList)
  }

  const handleIngredientAdd = () => {
    setIngredients([
      ...ingredients,
      {
        quantity: "",
        unit: "",
        ingredient: "",
      },
    ])
  }

  const handleIngredientDelete = (index) => {
    const ingredientsList = [...ingredients]
    ingredientsList.splice(index, 1)
    setIngredients(ingredientsList)
  }




  const handleStepChange = (e, index) => {
    const stepsList = [...steps]
    stepsList[index] = e.target.value
    setSteps(stepsList)
  }

  const handleStepAdd = () => {
    setSteps([...steps, ""])
  }

  const handleStepDelete = (index) => {
    const stepsList = [...steps]
    stepsList.splice(index, 1)
    setSteps(stepsList)
  }


  return (
    <Container component="main" maxWidth="sm">
      <Snackbar
        autoHideDuration={3000}
        open={isSnackbarOpen}
        message="Recipe has been added"
        onClose={() => setIsSnackbarOpen(false)}
      />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {recipeId ? <ModeEditOutlinedIcon /> : <AddOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          {recipeId ? "EDIT recipe" : "ADD recipe"}
        </Typography>
        {isLoading ?
          <Skeleton variant="rectangular" height={60} width="100%" animation="wave" />
          :
          <Box component="form" onSubmit={handleSubmitRecipe} noValidate sx={{ mt: 1 }}>

            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="title"
                  label="Title"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  maxRows={4}
                  fullWidth
                  name="description"
                  label="Description"
                  type="text"
                  id="description"
                  helperText="Write a meaningful description for your recipe"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>


              <Grid item xs={12}>
                <TextField
                  id="category"
                  required
                  fullWidth
                  select
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                // helperText="Category"
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>




              <Grid item xs={6} sm={6}>
                <TextField
                  name="servings"
                  required
                  fullWidth
                  id="servings"
                  label="Servings"
                  value={servings}
                  // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  onChange={(e) => setServings(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6}>

                <TextField
                  id="bakingTime"
                  required
                  fullWidth
                  select
                  label="Baking time"
                  value={bakingTime}
                  onChange={(e) => setBakingTime(e.target.value)}
                // helperText="Baking time"
                >
                  {bakingTimes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} marginTop={2}>
                <Typography variant="subtitle1" color="text.secondary">
                  Ingredients
                </Typography>
              </Grid>


              {ingredients.map((ingredient, index) => (
                <Ingredient key={`ingredient-${index}`} ingredientsLength={ingredients.length} ingredient={ingredient} index={index} onIngredientChange={handleIngredientChange} onIngredientAdd={handleIngredientAdd} onIngredientDelete={handleIngredientDelete} />
              ))}


              <Grid item xs={12} marginTop={2}>
                <Typography variant="subtitle1" color="text.secondary">
                  Steps
                </Typography>
              </Grid>

              {steps.map((step, index) => (
                <Step key={`step-${index}`} stepsLength={steps.length} step={step} index={index} onStepChange={handleStepChange} onStepDelete={handleStepDelete} onStepAdd={handleStepAdd} />
              ))}

            </Grid>

            <FormControlLabel
              control={<Checkbox value="public" color="primary" checked={checked}
                onChange={handleChangePublic} />}
              label="I want this recipe to be public!"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {recipeId ? "Edit this recipe" : "Add a recipe"}
            </Button>

            <Grid container>
              <Grid item>
                {recipeId ?
                  <Link href={`/recipes/${recipeId}`} variant="body2" onClick={() => navigate(`/recipes/${recipeId}`)}>
                    Changed your mind about these changes? Go back to recipe
                  </Link>
                  :
                  <Link href="/recipes" variant="body2" onClick={() => navigate("/recipes")}>
                    You don't want to add this recipe anymore? Go back to all recipes
                  </Link>
                }
              </Grid>
            </Grid>
          </Box>
        }
      </Box>
    </Container>
  )
}

export default RecipeForm
