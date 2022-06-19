import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'

import Hero from '../components/Hero'
import EditDelete from "../components/EditDelete"
import { API_URL } from "../utils/urls"
import user from "../reducers/user"
import loading from "../reducers/loading"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const firstName = useSelector((store) => store.user.firstName)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)

  const hero = {
    title: 'Title of a longer featured blog post',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
  }


  const handleDeleteProfile = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Authorization": accessToken,
        "Content-Type": "application/json"
      },
    }

    fetch(API_URL(`users/user/${userId}`), options)
      .then(res => res.json())
      .then(() => {
        dispatch(user.actions.logOut())
      })
  }



  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const isLoading = useSelector((store) => store.loading.isLoading)

  const [userRecipes, setUserRecipes] = useState([])


  useEffect(() => {
    dispatch(loading.actions.setLoading(true))
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken,
      },
    }

    fetch(API_URL(`recipes/user/${userId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserRecipes(data.response)
        } else {
          alert(data.response.message)
        }
        dispatch(loading.actions.setLoading(false))
      })
  }, [userRecipes])





  return (
    <>
      <Hero hero={hero} />
      {accessToken &&
        <EditDelete
          editPath={"/profile/edit"}
          openAction={handleClickOpen}
          open={open}
          setOpen={setOpen}
          handleDelete={handleDeleteProfile}
          itemId={userId}
          title={"Delete your profile?"}
          text={"Click to confirm that you want to delete your profile."}
        />
      }
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>
        <Divider />
        <Typography paragraph variant="p">
          {accessToken ? firstName : "Create an account to have access to XYZ here"}
        </Typography>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Recipe</TableCell>
              <TableCell align="right">Servings</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Baking time</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {userRecipes.map((recipe) => (
              <TableRow
                key={recipe.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link
                    href={`/recipes/${recipe._id}`}
                    onClick={() => navigate(`/recipes/${recipe._id}`)}
                    color="inherit"
                    underline="hover"
                  >
                    {recipe.title}
                  </Link>
                </TableCell>
                <TableCell align="right">{recipe.servings}</TableCell>
                <TableCell align="right">{recipe.category}</TableCell>
                <TableCell align="right">{recipe.bakingTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Profile
