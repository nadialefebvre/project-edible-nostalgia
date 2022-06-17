import React from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'

import user from "../reducers/user"


const Header = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const accessToken = useSelector((store) => store.user.accessToken)
  const firstName = useSelector((store) => store.user.firstName)

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {accessToken &&
          <Button size="small" onClick={() => dispatch(user.actions.logOut())}>Log out</Button>
        }
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {firstName ? `${firstName}'s recipes` : "Your recipes"}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small" onClick={() => navigate("/login")}>
          Sign up
        </Button>
      </Toolbar>
    </>
  )
}

export default Header