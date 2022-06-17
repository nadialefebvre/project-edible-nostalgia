import React from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import user from "../reducers/user"

const ITEM_HEIGHT = 48

const Header = () => {


  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const accessToken = useSelector((store) => store.user.accessToken)
  const firstName = useSelector((store) => store.user.firstName)

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* {accessToken &&
          <Button size="small" onClick={() => dispatch(user.actions.logOut())}>Log out</Button>
        } */}



        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          {accessToken ?
            <MenuItem onClick={() => dispatch(user.actions.logOut())}>
              Log out
            </MenuItem> :
            <MenuItem onClick={() => navigate("/login")}>
              Log in
            </MenuItem>
          }

          <MenuItem onClick={() => {
            navigate("/recipes")
            setAnchorEl(null)
          }}>
            All recipes
          </MenuItem>
          <MenuItem onClick={() => {
            navigate("/addrecipe")
            setAnchorEl(null)
          }}>
            Add a recipe
          </MenuItem>
        </Menu>




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
        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}
        <Box sx={{ width: 85 }}>
          {accessToken ?
            <Button variant="outlined" size="small" onClick={() => dispatch(user.actions.logOut())}>Log out</Button> :
            <Button variant="outlined" size="small" onClick={() => navigate("/login")}>
              Log in
            </Button>
          }
        </Box>

      </Toolbar>
    </>
  )
}

export default Header