import * as React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import uniqid from "uniqid"


const Steps = (props) => {
  const { recipe } = props

  return (
    <Grid
      item
      xs={12}
      md={8}
    >
      <Typography variant="h6" gutterBottom>
        Steps
      </Typography>
      <Divider />
      {recipe.steps.map(step => (
        <Typography key={uniqid()} paragraph variant="p">
          {step}
        </Typography>
      ))}
    </Grid>
  )
}

export default Steps