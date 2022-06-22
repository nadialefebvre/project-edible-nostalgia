import React from 'react'

import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

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

const Ingredient = (props) => {
  const { ingredientsLength, ingredient, index, onIngredientChange, onIngredientAdd, onIngredientDelete } = props




  return (
    <>
      <Grid item xs={6} sm={2}>
        <TextField
          name="quantity"
          required
          fullWidth
          label="Qty"
          value={ingredient.quantity}
          type="text"
          onChange={(e) => onIngredientChange(e, index)}
        />
      </Grid>


      <Grid item xs={6} sm={2}>

        <TextField
          required
          fullWidth
          select
          label="Unit"
          name="unit"
          value={ingredient.unit}
          onChange={(e) => onIngredientChange(e, index)}
        >
          {units.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={10} sm={7}>
        <TextField
          required
          fullWidth
          label="Ingredient"
          name="ingredient"
          value={ingredient.ingredient}
          onChange={(e) => onIngredientChange(e, index)}
        />
      </Grid>

      <Grid item xs={2} sm={1}>
        {ingredientsLength - 1 === index &&
          ingredientsLength < 10 && (
              <Tooltip title="Add" placement="right">
                <IconButton aria-label="add" size="small" onClick={onIngredientAdd}>
                  <AddCircleOutlineIcon fontSize="inherit" color="secondary" />
                </IconButton>
              </Tooltip>
          )}
        {ingredientsLength !== 1 && (
            <Tooltip title="Delete" placement="right">
              <IconButton aria-label="delete" size="small" onClick={() => onIngredientDelete(index)}>
                <DeleteOutlineIcon fontSize="inherit" color="secondary" />
              </IconButton>
            </Tooltip>
        )}
      </Grid>
    </>
  )
}

export default Ingredient
