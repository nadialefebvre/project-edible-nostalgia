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
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Link from '@mui/material/Link'

import Box from '@mui/material/Box'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

import Hero from '../components/Hero'
import EditDelete from "../components/EditDelete"
import { API_URL } from "../utils/urls"
import user from "../reducers/user"
import loading from "../reducers/loading"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const headCells = [
  {
    id: 'title',
    disablePadding: true,
    label: 'Recipe',
  },
  {
    id: 'bakingTime',
    disablePadding: false,
    label: 'Baking time',
  },
  {
    id: 'servings',
    disablePadding: false,
    label: 'Servings',
  },
  {
    id: 'category',
    disablePadding: false,
    label: 'Category',
  },
]

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead sx={{ border: 0 }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === "title" ? 'left' : 'right'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const Profile = () => {

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('title')
  const [hasAll, setHasAll] = useState(false)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const firstName = useSelector((store) => store.user.firstName)
  const email = useSelector((store) => store.user.email)
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

  const slugToUse = hasAll ? `recipes/user/${userId}/all` : `recipes/user/${userId}`


  useEffect(() => {
    dispatch(loading.actions.setLoading(true))
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken,
      },
    }

    fetch(API_URL(slugToUse), options)
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




  const handleChangeHasAll = (event) => {
    setHasAll(event.target.checked)
  }



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
          {accessToken ? `${firstName} (${email})` : "Create an account to have access to XYZ here"}
        </Typography>
      </Grid>
      <Box >
        <Paper sx={{ mb: 2 }}>
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={userRecipes.length}
              />
              <TableBody>
                {userRecipes.slice().sort(getComparator(order, orderBy))
                  .map((recipe) => (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, recipe.title)}
                      role="checkbox"
                      tabIndex={-1}
                      key={recipe.title}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        id={recipe.title}
                        scope="row"
                      >
                        <Link href={`/recipes/${recipe._id}`} color="inherit" underline="hover">
                          {recipe.title}
                        </Link>
                      </TableCell>
                      <TableCell align="right">{recipe.bakingTime}</TableCell>
                      <TableCell align="right">{recipe.servings}</TableCell>
                      <TableCell align="right">{recipe.category}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <FormControlLabel
          control={<Switch checked={hasAll} onChange={handleChangeHasAll} />}
          label="All recipes"
        />
      </Box>
    </>
  )
}

export default Profile
