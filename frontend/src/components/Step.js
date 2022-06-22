import React from 'react'

import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const Step = (props) => {
  const { stepsLength, step, index, onStepChange, onStepDelete, onStepAdd } = props

  return (
    <>
      <Grid item xs={10} sm={11}>
        <TextField
          required
          fullWidth
          multiline
          maxRows={4}
          id="step"
          label="Step"
          name="step"
          value={step}
          onChange={(e) => onStepChange(e, index)}
        />
      </Grid>
      <Grid item xs={2} sm={1}>
        {stepsLength !== 1 && (
          <Tooltip title="Delete" placement="right">
            <IconButton aria-label="delete" size="small" onClick={() => onStepDelete(index)}>
              <DeleteOutlineIcon fontSize="inherit" color="secondary" />
            </IconButton>
          </Tooltip>
        )}
        {stepsLength - 1 === index &&
          stepsLength < 10 && (
            <Tooltip title="Add" placement="right">
              <IconButton aria-label="add" size="small" onClick={onStepAdd}>
                <AddCircleOutlineIcon fontSize="inherit" color="secondary" />
              </IconButton>
            </Tooltip>
          )}
      </Grid>
    </>
  )
}

export default Step
