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
import Login from "./pages/Login"
// import LoggedIn from "./pages/LoggedIn"
// import NotFound from "pages/NotFound"
// import Profile from "./pages/Profile"
// import EditProfile from "./pages/EditProfile"
import Home from "./pages/Home"
import SingleRecipe from "./pages/SingleRecipe"
import AllRecipes from "./pages/AllRecipes"
import RecipeForm from "./pages/RecipeForm"

const theme = createTheme()

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





const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Header />
            <main>
              <Routes>
                {/* <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} /> */}
                {/* <Route path="/loggedin" element={<LoggedIn />} /> */}
                <Route path="/recipes" element={<AllRecipes />} />
                <Route path="/recipes/:recipeId" element={<SingleRecipe />} />
                <Route path="/recipes/add" element={<RecipeForm />} />
                <Route path="/recipes/:recipeId/edit" element={<RecipeForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                {/* <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </main>
          </Container>
          <Footer
            title="Footer"
            description="Something here to give the footer a purpose!"
          />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
