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
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import loading from "../reducers/loading"
import user from "../reducers/user"
import Loader from "../components/Loader"
import { API_URL } from "../utils/utils"


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector((store) => store.loading.isLoading)
  const accessToken = useSelector((store) => store.user.accessToken)

  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [mode, setMode] = useState("login")

  // useEffect(() => {
  //   if (accessToken) {
  //     navigate("/recipes")
  //   }
  // }, [accessToken])

  const onFormSubmit = (event) => {
    event.preventDefault()
    if (mode === "register" && (!email || !password)) {
      alert("All fields are required.")
    } else if (mode === "login" && (!email || !password)) {
      alert("Email and password are required.")
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

  if (isLoading) {
    return <Loader />
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {mode === "register" ? "Register" : "Log in"}
          </Typography>
          <Box component="form" onSubmit={onFormSubmit} noValidate sx={{ mt: 1 }}>
            {mode === "register" ?
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="First name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                onChange={e => setFirstName(e.target.value)}
              />
              : null}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'lightblue' }}
            >
              {mode === "register" ? "Register" : "Log in"}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setMode(mode === "register" ? "login" : "register")}>
                  {mode === "register"
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

export default Login
