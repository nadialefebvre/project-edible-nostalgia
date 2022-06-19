import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import Hero from '../components/Hero'
import EditDelete from "../components/EditDelete"
import { API_URL } from "../utils/urls"
import user from "../reducers/user"


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

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/")
  //   }
  // }, [accessToken])


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

  return (
    <>
      <Hero hero={hero} />
      <EditDelete editPath={"/profile/edit"} openAction={handleClickOpen} open={open} setOpen={setOpen} handleDeleteRecipe={handleDeleteProfile} itemId={userId} title={"Delete your profile?"} text={"Click to confirm that you want to delete your profile."} />
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
        Profile
        </Typography>
        <Divider />
        <Typography paragraph variant="p">
          {accessToken ? firstName : "Create an account to have access to XYZ here"}
        </Typography>
      </Grid>
    </>
  )
}

export default Profile
