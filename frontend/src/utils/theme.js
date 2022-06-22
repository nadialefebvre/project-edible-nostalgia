import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  // typography: {
  //   // fontFamily: ["Meddon", "Arial"].join(","),

  //   // ne fonctionne pas???
  //   h1: {
  //     fontFamily: "Meddon"
  //   }
  // },
  palette: {
    primary: {
      light: "#c7c7b8",
      main: "#72725a",
      dark: "#474738",
      contrastText: "#fff",
    },

    secondary: {
      light: "#dbb7a4",
      main: "#b66f49",
      dark: "#92593a",
      contrastText: "#fff",
    },
  },
})