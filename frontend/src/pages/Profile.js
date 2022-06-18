import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

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
    title: `${firstName}`,
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
  }

  useEffect(() => {
    if (!accessToken) {
      navigate("/")
    }
  }, [accessToken])


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
      <EditDelete editPath={"/user/edit"} openAction={handleClickOpen} open={open} setOpen={setOpen} handleDeleteRecipe={handleDeleteProfile} itemId={userId} title={"Delete your profile?"} text={"Click to confirm that you want to delete your profile."} />
    </>
  )
}

export default Profile
