export const units = [
  {
    value: "ml",
    label: "ml",
  },
  {
    value: "dl",
    label: "dl",
  },
  {
    value: "L",
    label: "L",
  },
  {
    value: "g",
    label: "g",
  },
  {
    value: "kg",
    label: "kg",
  },
  {
    value: "tsp",
    label: "tsp",
  },
  {
    value: "tbsp",
    label: "tbsp",
  },
  {
    value: "cup(s)",
    label: "cup(s)",
  },
  {
    value: "pcs",
    label: "pcs",
  }
]

export const routes = [
  { path: "/recipes/add", breadcrumb: "Add" },
  { path: "/recipes/:recipeId", breadcrumb: "Recipe" },
  { path: "/recipes", breadcrumb: "All" },
  { path: "/error404", breadcrumb: "Error 404" },
  { path: "/accessdenied", breadcrumb: "Access denied" },
]

export const headCells = [
  {
    id: "title",
    disablePadding: true,
    label: "Recipe",
  },
  {
    id: "rating",
    disablePadding: true,
    label: "Rating",
  },
  {
    id: "bakingTime",
    disablePadding: false,
    label: "Baking time",
  },
  {
    id: "servings",
    disablePadding: false,
    label: "Servings",
  },
  {
    id: "category",
    disablePadding: false,
    label: "Category",
  },
]

export const categories = [
  {
    value: "Holidays",
    label: "Holidays",
  },
  {
    value: "Childhood",
    label: "Childhood",
  },
  {
    value: "Travel",
    label: "Travel",
  },
  {
    value: "Birthday",
    label: "Birthday",
  },
  {
    value: "Homesick",
    label: "Homesick",
  },
  {
    value: "Grandma",
    label: "Grandma",
  },
  {
    value: "Friendship",
    label: "Friendship",
  },
  {
    value: "Love",
    label: "Love",
  },
  {
    value: "Other",
    label: "Other",
  }
]

export const bakingTimes = [
  {
    value: "Quick and easy",
    label: "Quick and easy",
  },
  {
    value: "Squeezable",
    label: "Squeezable",
  },
  {
    value: "Needs more time",
    label: "Needs more time",
  }
]
