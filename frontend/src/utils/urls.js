const BASE_URL = "https://edible-nostalgia-kijk33idxa-lz.a.run.app"

export const API_URL = (slug) => `${BASE_URL}/${slug}`

export const imageToUse = (category) => {
  switch (category) {
    case "Homesick":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655920772/homesick_visq6w.jpg"
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
    case "Travel":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655922081/travel_y3lbnm.jpg"
    case "Other":
      return "https://res.cloudinary.com/devnadia/image/upload/v1655922081/viewmaster_p4vsth.jpg"
    default:
      return "https://res.cloudinary.com/devnadia/image/upload/v1655658415/nostalgia_qk8prs.jpg"
  }
}
