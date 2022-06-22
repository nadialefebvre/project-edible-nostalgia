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
      <Grid item xs={2} sm={2}>
        <TextField
          name="quantity"
          required
          fullWidth
          id="quantity"
          label="Qty"
          value={ingredient.quantity}
          // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={(e) => onIngredientChange(e, index)}
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
          onChange={(e) => onIngredientChange(e, index)}
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
          onChange={(e) => onIngredientChange(e, index)}
        />
      </Grid>

      <Grid item xs={2} sm={2}>
        {ingredientsLength - 1 === index &&
          ingredientsLength < 10 && (
            <Box sx={{
              width: 30, display: "flex", justifyContent: "flex-end", marginRight: 0
            }}>
              <Tooltip title="Add" placement="right">
                <IconButton aria-label="add" size="small" onClick={onIngredientAdd}>
                  <AddCircleOutlineIcon fontSize="inherit" color="secondary" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        {ingredientsLength !== 1 && (
          <Box sx={{
            width: 30, display: "flex", justifyContent: "flex-end", marginRight: 0
          }}>
            <Tooltip title="Delete" placement="right">
              <IconButton aria-label="delete" size="small" onClick={() => onIngredientDelete(index)}>
                <DeleteOutlineIcon fontSize="inherit" color="secondary" />
              </IconButton>
            </Tooltip>
          </Box>
        )}


      </Grid>
    </>
  )
}

export default Ingredient
