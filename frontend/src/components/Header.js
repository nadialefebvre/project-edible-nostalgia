import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined'

import user from "../reducers/user"
import BreadcrumbsNav from "./BreadcrumbsNav"

const ITEM_HEIGHT = 48

const Header = () => {

  const [anchorEl, setAnchorEl] = useState(null)
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
    <Toolbar sx={{
      borderBottom: 1,
      borderColor: 'divider',
      justifyContent: "space-between",
      displayPrint: 'none'
    }}>
      <BreadcrumbsNav />

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

        <MenuItem onClick={() => {
          navigate("/")
          setAnchorEl(null)
        }}>
          <ListItemIcon>
            <HomeOutlinedIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {
          navigate("/recipes")
          setAnchorEl(null)
        }}>
          <ListItemIcon>
            <ClearAllOutlinedIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>All recipes</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => {
          navigate("/recipes/add")
          setAnchorEl(null)
        }}>
          <ListItemIcon>
            <AddOutlinedIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>Add recipe</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {
          navigate("/profile")
          setAnchorEl(null)
        }}>
          <ListItemIcon>
            {accessToken ?
              <LockOpenOutlinedIcon fontSize="small" color="secondary" />
              :
              <LockOutlinedIcon fontSize="small" color="secondary" />
            }
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>

        {accessToken ?
          <MenuItem onClick={() => dispatch(user.actions.logOut())}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem> :
          <MenuItem onClick={() => navigate("/login")}>
            <ListItemIcon>
              <LoginOutlinedIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            <ListItemText>Log in</ListItemText>
          </MenuItem>
        }
      </Menu>
    </Toolbar>
  )
}

export default Header