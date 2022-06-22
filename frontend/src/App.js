import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'


import Header from './components/Header'
import Footer from './components/Footer'


import loading from "reducers/loading"
import user from "./reducers/user"
import Error404 from "pages/Error404"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import SingleRecipe from "./pages/SingleRecipe"
import AllRecipes from "./pages/AllRecipes"
import RecipeForm from "./pages/RecipeForm"
import UserForm from "./pages/UserForm"

// const theme = createTheme()

import { theme } from "./utils/theme"

const reducer = combineReducers({
  loading: loading.reducer,
  user: user.reducer
})

const persistedStateJSON = localStorage.getItem("state")
let persistedState = {}

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON)
}

const store = configureStore({ reducer, preloadedState: persistedState })

store.subscribe(() => {
  localStorage.setItem("state", JSON.stringify(store.getState()))
})

const hero = {
  title: 'Edible nostalgia',
  description:
    "Food has a special place in our brain, it is deeply connected to all our reminiscences. Collect here your precious recipes.",
  image: 'https://res.cloudinary.com/devnadia/image/upload/v1655658415/nostalgia_qk8prs.jpg'
}


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="md" sx={{ bgcolor: "#eddcd2" }}>
            <Header />
            <main>
              <Routes>
                <Route path="/recipes" element={<AllRecipes hero={hero} />} />
                <Route path="/recipes/:recipeId" element={<SingleRecipe />} />
                <Route path="/recipes/add" element={<RecipeForm />} />
                <Route path="/recipes/:recipeId/edit" element={<RecipeForm />} />
                <Route path="/login" element={<UserForm />} />
                <Route path="/profile" element={<Profile hero={hero} />} />
                <Route path="/profile/edit" element={<UserForm />} />
                <Route path="/" element={<Home hero={hero} />} />
                <Route path="*" element={<Error404 hero={hero} />} />
                <Route path="/error404" element={<Error404 hero={hero} />} />
              </Routes>
            </main>
            <Footer />
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
