import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import Link from "@mui/material/Link"
import Skeleton from "@mui/material/Skeleton"
import Rating from "@mui/material/Rating"
import Box from "@mui/material/Box"

import Hero from "../components/Hero"
import EditDelete from "../components/EditDelete"
import ProfileTableHead from "../components/ProfileTableHead"
import user from "../reducers/user"
import loading from "../reducers/loading"
import { API_URL } from "../utils/urls"

const Profile = ({ hero }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoading = useSelector(store => store.loading.isLoading)
  const firstName = useSelector(store => store.user.firstName)
  const email = useSelector(store => store.user.email)
  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector(store => store.user.userId)

  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("title")
  const [hasPublicRecipes, setHasPublicRecipes] = useState(false)
  const [open, setOpen] = useState(false)
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    if (!accessToken) {
      navigate("/accessdenied")
    }
  }, [])

  useEffect(() => {
    if (userId != null) {
      dispatch(loading.actions.setLoading(true))

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": accessToken,
        },
      }

      const slugToUse =
        hasPublicRecipes ? `recipes/user/${userId}/public` : `recipes/user/${userId}`

      fetch(API_URL(slugToUse), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setRecipes(data.response)
          } else {
            alert(data.response.message)
          }
          dispatch(loading.actions.setLoading(false))
        })
    }
  }, [userId, hasPublicRecipes])

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangeHasPublicRecipes = (event) => {
    setHasPublicRecipes(event.target.checked)
  }

  const handleClickOpen = () => {
    setOpen(true)
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
        navigate("/recipes")
        dispatch(user.actions.logOut())
      })
  }

  return (
    <>
      <Hero hero={hero} />
      <EditDelete
        editPath="/profile/edit"
        openAction={handleClickOpen}
        open={open}
        setOpen={setOpen}
        handleDelete={handleDeleteProfile}
        itemId={userId}
        title="Delete your profile?"
        text="Click to confirm that you want to delete your profile."
      />
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>
        <Divider />
        <Typography paragraph variant="p">
          {firstName}'s email: {email}
        </Typography>
      </Grid>
      {isLoading ?
        <Skeleton
          variant="rectangular"
          height={140}
          width="100%"
          animation="wave"
        />
        :
        <Box >
          <Paper sx={{ mb: 2 }}>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
              >
                <ProfileTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={recipes.length}
                />
                <TableBody>
                  {recipes.slice().sort(getComparator(order, orderBy))
                    .map((recipe) => {
                      recipe.rating = recipe.ratingCount > 0
                        ? Math.round(recipe.totalRating / recipe.ratingCount)
                        : 0
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, recipe.title)}
                          role="checkbox"
                          tabIndex={-1}
                          key={recipe.title}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell
                            component="th"
                            id={recipe.title}
                            scope="row"
                          >
                            <Link
                              href={`/recipes/${recipe._id}`}
                              color="inherit"
                              underline="hover"
                            >
                              {recipe.title}
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            <Rating
                              readOnly
                              size="small"
                              value={recipe.rating}
                            />
                          </TableCell>
                          <TableCell align="right">{recipe.bakingTime}</TableCell>
                          <TableCell align="right">{recipe.servings}</TableCell>
                          <TableCell align="right">{recipe.category}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <FormControlLabel
            control={
              <Switch checked={hasPublicRecipes} onChange={handleChangeHasPublicRecipes} />
            }
            label="Include public recipes"
          />
        </Box>
      }
    </>
  )
}

export default Profile
