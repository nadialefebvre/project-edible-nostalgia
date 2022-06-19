import mongoose from "mongoose"

// FIX FIELDS EVENTUALLY
const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  category: {
    type: String,
    required: true,
  },
  bakingTime: {
    type: String
  },
  servings: {
    type: Number
  },
  ingredients: [
    {
      quantity: Number,
      unit: String,
      ingredient: String
    }
  ],
  steps: [String],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

const Recipe = mongoose.model("Recipe", RecipeSchema)

export default Recipe
