import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: null,
  firstName: null,
  email: null,
  accessToken: null,
  error: null
}

const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setFirstName: (store, action) => {
      store.firstName = action.payload
    },
    setEmail: (store, action) => {
      store.email = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
    logOut: () => initialState
  }
})

export default user
