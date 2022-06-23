import React, { useState, useEffect } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Skeleton from "@mui/material/Skeleton"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

import loading from "../reducers/loading"
import user from "../reducers/user"
import { API_URL } from "../utils/urls"

const UserForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector(store => store.loading.isLoading)
  const accessToken = useSelector(store => store.user.accessToken)
  const userFirstName = useSelector(store => store.user.firstName)
  const userEmail = useSelector(store => store.user.email)
  const userId = useSelector(store => store.user.userId)

  const [firstName, setFirstName] = useState(userFirstName || "")
  const [email, setEmail] = useState(userEmail || "")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("login")
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken])

  const loginOrRegister = () => {
    if (!email || !password) {
      setSnackbarMessage("Email and password are required.")
      setIsSnackbarOpen(true)
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
              navigate("/profile")
              dispatch(user.actions.setFirstName(data.response.firstName))
              dispatch(user.actions.setEmail(data.response.email))
              dispatch(user.actions.setUserId(data.response.userId))
              dispatch(user.actions.setAccessToken(data.response.accessToken))
              dispatch(user.actions.setError(null))
            })
          } else {
            batch(() => {
              setIsSnackbarOpen(true)
              setSnackbarMessage(data.response.message)
              dispatch(user.actions.setError(data.response))
              dispatch(user.actions.setFirstName(null))
              dispatch(user.actions.setEmail(null))
              dispatch(user.actions.setUserId(null))
              dispatch(user.actions.setAccessToken(null))
            })
          }
        })
        .catch(error => console.error("Error:", error))
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
            navigate("/profile")
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
      })
      .catch(error => console.error("Error:", error))
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
          navigate("/profile")
          dispatch(user.actions.setError(null))
        } else {
          setIsSnackbarOpen(true)
          setSnackbarMessage(data.response.message)
          dispatch(user.actions.setError(data.response))
        }
      })
      .catch(error => console.error("Error:", error))
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    dispatch(loading.actions.setLoading(true))
    const passwordChanged = password !== ""
    const otherFieldsChanged = firstName !== userFirstName || email !== userEmail
    if (accessToken) {
      if (!passwordChanged && !otherFieldsChanged) {
        setIsSnackbarOpen(true)
        setSnackbarMessage("No change to submit.")
      } else if (passwordChanged) {
        editPassword()
      } else if (otherFieldsChanged) {
        editOtherFields()
      } else if (passwordChanged && otherFieldsChanged) {
        editPassword()
        editOtherFields()
      }
    } else {
      loginOrRegister()
    }
    dispatch(loading.actions.setLoading(false))
  }

  return (
    <>
      <Snackbar
        autoHideDuration={3000}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert onClose={() => setIsSnackbarOpen(false)} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {accessToken ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
          </Avatar>

          <Typography component="h1" variant="h5">
            {accessToken ? "Edit profile" : mode === "register" ? "Register" : "Log in"}
          </Typography>

          {isLoading ?
            <Skeleton
              variant="rectangular"
              height={60}
              width="100%"
              animation="wave"
            />
            :
            <Box
              component="form"
              onSubmit={onFormSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
                : null
              }

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
                sx={{ mt: 3, mb: 2 }}
              >
                {accessToken ? "Edit user" : mode === "register" ? "Register" : "Log in"}
              </Button>

              <Grid container>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => accessToken
                      ? navigate("/profile")
                      : setMode(mode === "register" ? "login" : "register")
                    }
                  >
                    {accessToken
                      ? "Changed your mind or are done? Go back to profile"
                      : mode === "register"
                        ? "You have an account? Click here to log in"
                        : "Don't have an account? Click here to register"
                    }
                  </Link>
                </Grid>
              </Grid>
            </Box>
          }
        </Box>
      </Container>
    </>
  )
}

export default UserForm
