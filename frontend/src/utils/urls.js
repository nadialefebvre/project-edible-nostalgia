// const BASE_URL = "http://localhost:8080"
const BASE_URL = "https://nadia-final-project.herokuapp.com"

export const API_URL = (slug) => `${BASE_URL}/${slug}`


export const imageToUse = (category) => {
  // if (category === "Whatever") {
  //   return "https://res.cloudinary.com/devnadia/image/upload/v1655652905/Whatever_aep1gl.jpg"
  // } else {
  //   return "https://images.unsplash.com/photo-1577048982771-1960014bde8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
  // }

  switch (category) {
    case "Homesick":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655655685/maple_f8n3r1.jpg"
      break
    case "Childhood":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655652905/childhood_aep1gl.jpg"
      break
    case "Birthday":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655654517/birthday_eyj6w9.jpg"
      break
    case "Christmas":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655654833/christmas_yl7v9f.jpg"
      break
    // case "Grandma":
    //   return ""
    //   break
    // case "":
    //   return ""
    //   break
    // case "":
    //   return ""
    //   break

    default:
      return ""
  }
}
