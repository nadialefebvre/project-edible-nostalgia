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
    case "Childhood":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655919414/childhood_xgzqap.jpg"
    case "Birthday":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655882765/birthday_xjvnmg.jpg"
    case "Holidays":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655919672/holidays_uogrrc.jpg"
    case "Grandma":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655918880/grandma_vvdow5.jpg"
    case "Friendship":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655919414/friendship_rm9yqu.jpg"
        case "Love":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655919546/love_u8n8fw.jpg"


    default:
      return ""
  }
}
