import * as React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
// import Markdown from './Markdown';

function Main(props) {
  const { posts, title } = props

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
      <Typography paragraph variant="p">
        Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.
      </Typography>
      <Typography paragraph variant="p">
        Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.
      </Typography>
      <Typography paragraph variant="p">
        Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.
      </Typography>


    </Grid>
  )
}

export default Main