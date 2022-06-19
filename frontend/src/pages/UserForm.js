import React, { useState, useEffect } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import loading from "../reducers/loading"
import user from "../reducers/user"
import Loader from "../components/Loader"
import FormLoader from "../components/FormLoader"

import { API_URL } from "../utils/urls"


const UserForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector((store) => store.loading.isLoading)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userFirstName = useSelector((store) => store.user.firstName)
  const userEmail = useSelector((store) => store.user.email)
  const userId = useSelector((store) => store.user.userId)

  const [firstName, setFirstName] = useState(userFirstName || "")
  const [email, setEmail] = useState(userEmail || "")
  const [password, setPassword] = useState("")

  const [mode, setMode] = useState("login")

  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken])

  const loginOrRegister = () => {
    if (!email || !password) {
      alert("All fields are required.")
    } else {
      dispatch(loading.actions.setLoading(true))
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, password })
      }
      fetch(API_URL(mode), options)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            batch(() => {
              if (mode === "register") {
                alert("User has been created.")
              } else {
                alert("User is now logged in.")
              }
              dispatch(user.actions.setFirstName(data.response.firstName))
              dispatch(user.actions.setEmail(data.response.email))
              dispatch(user.actions.setUserId(data.response.userId))
              dispatch(user.actions.setAccessToken(data.response.accessToken))
              dispatch(user.actions.setError(null))
            })
          } else {
            batch(() => {
              alert(data.response.message)
              dispatch(user.actions.setError(data.response))
              dispatch(user.actions.setFirstName(null))
              dispatch(user.actions.setEmail(null))
              dispatch(user.actions.setUserId(null))
              dispatch(user.actions.setAccessToken(null))
            })
          }
          dispatch(loading.actions.setLoading(false))
        })
    }
  }

  const editOtherFields = () => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      },
      body: JSON.stringify({ firstName, email })
    }
    fetch(API_URL(`users/user/${userId}/edit/other`), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            // alert("First name and/or email have been updated.")
            dispatch(user.actions.setFirstName(firstName))
            dispatch(user.actions.setEmail(email))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            alert(data.response.message)
            dispatch(user.actions.setError(data.response))
            dispatch(user.actions.setFirstName(null))
            dispatch(user.actions.setEmail(null))
          })
        }
        dispatch(loading.actions.setLoading(false))
      })
  }

  const editPassword = () => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      },
      body: JSON.stringify({ password })
    }
    fetch(API_URL(`users/user/${userId}/edit/password`), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPassword("")
          // alert("Password has been updated.")
          dispatch(user.actions.setError(null))
        } else {
          alert(data.response.message)
          dispatch(user.actions.setError(data.response))
        }
        dispatch(loading.actions.setLoading(false))
      })
  }


  const onFormSubmit = (event) => {
    event.preventDefault()
    dispatch(loading.actions.setLoading(true))
    if (accessToken) {
      if (firstName !== userFirstName || email !== userEmail) {
        editOtherFields()
      }
      if (password !== "") {
        editPassword()
      }
    } else {
      loginOrRegister()
      navigate("/profile")
    }
  }

  if (isLoading) {
    return <FormLoader />
    // return <Loader />
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {accessToken ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
            {accessToken ? "Edit user" : mode === "register" ? "Register" : "Log in"}
          </Typography>
          <Box component="form" onSubmit={onFormSubmit} noValidate sx={{ mt: 1 }}>
            {mode === "register" || accessToken ?
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label={accessToken ? "New first name" : "First name"}
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              : null}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={accessToken ? "New email" : "Email"}
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={accessToken ? "New password" : "Password"}
              type="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'lightblue' }}
            >
              {accessToken ? "Edit user" : mode === "register" ? "Register" : "Log in"}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => accessToken ? navigate("/recipes") : (setMode(mode === "register" ? "login" : "register"))}
                >
                  {accessToken ? "Changed your mind about these changes? Go back to profile" : mode === "register"
                    ?
                    "You have an account? Click here to log in"
                    :
                    "Don't have an account? Click here to register"
                  }
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default UserForm
