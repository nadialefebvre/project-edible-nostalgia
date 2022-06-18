import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import { API_URL } from "../utils/utils"
import loading from "../reducers/loading"
import Loader from "../components/Loader"
import user from "../reducers/user"


const categories = [
  {
    value: 'Christmas',
    label: 'Christmas',
  },
  {
    value: 'Birthday',
    label: 'Birthday',
  },
  {
    value: 'Whatever',
    label: 'Whatever',
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


const units = [
  {
    value: 'ml',
    label: 'ml',
  },
  {
    value: 'dl',
    label: 'dl',
  },
  {
    value: 'L',
    label: 'L',
  },
  {
    value: 'g',
    label: 'g',
  },
  {
    value: 'kg',
    label: 'kg',
  },
  {
    value: 'tsp',
    label: 'tsp',
  },
  {
    value: 'tbsp',
    label: 'tbsp',
  },
  {
    value: 'cup(s)',
    label: 'cup(s)',
  },
  {
    value: 'pcs',
    label: 'pcs',
  }
]


export default function EditRecipe() {

  const { recipeId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector((store) => store.loading.isLoading)

  // const [unit, setUnit] = useState("")

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
          dispatch(loading.actions.setLoading(false))
        })
    }, [])
  }





  const onAddRecipe = (event) => {
    event.preventDefault()
    dispatch(loading.actions.setLoading(true))
    const options = {
      method: `${recipeId ? "PATCH" : "POST"}`,
      // method: "PATCH",
      headers: {
        // "Authorization": accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description, category, bakingTime, servings, ingredients, steps })
    }

    fetch(API_URL(`${recipeId ? `recipes/recipe/${recipeId}` : "recipes"}`), options)
      // fetch(API_URL(`recipes/recipe/${recipeId}`), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (recipeId) {
            alert("Recipe has been edited.")
            navigate(`/recipes/${recipeId}`)
          } else {
            alert("Recipe has been added.")
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




  if (isLoading) {
    return <Loader />
  }


  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {recipeId ? "EDIT recipe" : "ADD recipe"}
        </Typography>
        <Box component="form" onSubmit={onAddRecipe} noValidate sx={{ mt: 1 }}>

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
              <>
                {/* <Grid item xs={12}>
              <Stack direction="row" spacing={2}> */}
                <Grid item xs={2} sm={2}>
                  <TextField
                    name="quantity"
                    required
                    fullWidth
                    id="quantity"
                    label="Qty"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(e, index)}
                  />
                </Grid>


                <Grid item xs={2} sm={2}>

                  <TextField
                    id="unit"
                    required
                    fullWidth
                    select
                    label="Unit"
                    name="unit"
                    // value={unit}
                    // onChange={(e) => setUnit(e.target.value)}
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(e, index)}
                  // helperText="Unit"
                  >
                    {units.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="ingredient"
                    label="Ingredient"
                    name="ingredient"
                    value={ingredient.ingredient}
                    onChange={(e) => handleIngredientChange(e, index)}
                  />
                </Grid>

                <Grid item xs={2} sm={2}>
                  {ingredients.length - 1 === index &&
                    ingredients.length < 10 && (
                      <Box sx={{
                        width: 30, display: "flex", justifyContent: "flex-end", marginRight: 0
                      }}>
                        <IconButton aria-label="add" size="small" onClick={handleIngredientAdd}>
                          <AddCircleOutlineIcon fontSize="inherit" />
                        </IconButton>
                      </Box>
                    )}
                  {ingredients.length !== 1 && (
                    <Box sx={{
                      width: 30, display: "flex", justifyContent: "flex-end", marginRight: 0
                    }}>
                      <IconButton aria-label="delete" size="small" onClick={() => handleIngredientDelete(index)}>
                        <DeleteOutlineIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  )}


                </Grid>
                {/* </Stack>
            </Grid> */}
              </>
            ))}










            <Grid item xs={12} marginTop={2}>
              <Typography variant="subtitle1" color="text.secondary">
                Steps
              </Typography>
            </Grid>




            {steps.map((step, index) => (
              <>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="step"
                    label="Step"
                    name="step"
                    value={step}
                    onChange={(e) => handleStepChange(e, index)}
                  />
                </Grid>
                {steps.length !== 1 && (
                  <IconButton aria-label="delete" size="small" onClick={() => handleStepDelete(index)}>
                    <DeleteOutlineIcon fontSize="inherit" />
                  </IconButton>
                )}
                {steps.length - 1 === index &&
                  steps.length < 10 && (
                    <IconButton aria-label="add" size="small" onClick={handleStepAdd}>
                      <AddCircleOutlineIcon fontSize="inherit" />
                    </IconButton>
                  )}
              </>
            ))}



          </Grid>



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
                <Link href="#" variant="body2" onClick={() => navigate(`/recipes/${recipeId}`)}>
                  Changed your mind about these changes? Go back to recipe
                </Link>
                :
                <Link href="#" variant="body2" onClick={() => navigate("/recipes")}>
                  You don't want to add this recipe anymore? Go back to all recipes
                </Link>
              }
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}