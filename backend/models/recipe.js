import mongoose from "mongoose"

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: String
  },
  bakingTime: {
    type: String
  },
  servings: {
    type: Number
  },
  mainIngredient: {
    type: String
  },
  source: {
    type: String
  },
  ingredients: [
    {
      quantity: {
        type: Number,
      },
      unit: {
        type: String
      },
      ingredient: {
        type: String
      }
    }
  ],
  steps: [
    {
      step: {
        type: String
      }
    },
  ],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

const Recipe = mongoose.model("Recipe", RecipeSchema)

export default Recipe
