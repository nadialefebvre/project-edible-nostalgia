import React, { useState } from 'react'
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
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

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


export default function AddRecipe() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }



  const [unit, setUnit] = useState("")

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
  const [steps, setSteps] = useState([])

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
          New recipe
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

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



            <Grid item xs={2} sm={2}>
              <TextField
                name="quantity"
                required
                fullWidth
                id="quantity"
                label="Qty"
              />
            </Grid>


            <Grid item xs={2} sm={2}>

              <TextField
                id="unit"
                required
                fullWidth
                select
                label="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
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
              />
            </Grid>

            <Grid item xs={2} sm={2}>
              <Box sx={{
                width: 30, display: "flex", justifyContent: "flex-end", marginRight: 0
              }}>
                <IconButton aria-label="delete" size="small">
                  <AddCircleOutlineIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <Box sx={{
                width: 30, display: "flex", justifyContent: "flex-end", marginRight: 0
              }}>
                <IconButton aria-label="delete" size="small">
                  <DeleteOutlineIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Grid>


            <Grid item xs={12} marginTop={2}>
              <Typography variant="subtitle1" color="text.secondary">
                Steps
              </Typography>
            </Grid>


            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="step"
                label="Step"
                name="step"
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}