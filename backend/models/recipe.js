import mongoose from "mongoose"

// FIX FIELDS EVENTUALLY : REQUIRED OR NOT here?? UNIQUE?
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
  category: {
    type: String,
    required: true,
  },
  bakingTime: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  ingredients: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      ingredient: {
        type: String,
        required: true,
      }
    }
  ],
  steps: [{
    type: String,
    required: true,
  }],
  isPublic: Boolean,
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  ratingCount: Number,
  totalRating: Number
})

const Recipe = mongoose.model("Recipe", RecipeSchema)

export default Recipe
