import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

const Footer = () => {

  return (
    <Box component="footer" sx={{ py: 6, displayPrint: 'none' }}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://nadialefebvre.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nadia Lefebvre
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  )
}

export default Footer
