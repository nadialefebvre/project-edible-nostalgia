import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import ClearAllOutlinedIcon from "@mui/icons-material/ClearAllOutlined"

import BreadcrumbsNav from "./BreadcrumbsNav"
import user from "../reducers/user"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const accessToken = useSelector(store => store.user.accessToken)
  
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  return (
    <Toolbar sx={{
      borderBottom: 1,
      borderColor: "divider",
      justifyContent: "space-between",
      displayPrint: "none"
    }}>
      <BreadcrumbsNav />

      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >

        <MenuItem onClick={() => {
          navigate("/recipes")
          setAnchorEl(null)
        }}>
          <ListItemIcon>
            <ClearAllOutlinedIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>All</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {
          navigate("/recipes/add")
          setAnchorEl(null)
        }}>
          <ListItemIcon>
            <AddOutlinedIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>Add</ListItemText>
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
          <MenuItem onClick={() => {
            navigate("/recipes")
            dispatch(user.actions.logOut())
          }}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>
          :
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
