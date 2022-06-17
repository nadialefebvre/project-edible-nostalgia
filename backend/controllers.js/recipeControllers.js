import Recipe from "../models/recipe"

//--------------------------- ADD RECIPE CONTROLLER ---------------------------//
export const addRecipe = async (req, res) => {
  const { title, description, image, category, servings, bakingTime, ingredients, steps, addedBy } = req.body

  try {
    const newRecipe = await new Recipe({
      title,
      description,
      image,
      category,
      servings,
      bakingTime,
      ingredients,
      steps,
      addedBy
    }).save()

    res.status(201).json({
      success: true,
      status_code: 201,
      response: newRecipe
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request.",
        errors: error
      }
    })
  }
}

//--------------------------- GET ALL RECIPES CONTROLLER FOR DEV PURPOSE - TO REMOVE EVENTUALLY ---------------------------//
export const getRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find()

    res.status(200).json({
      success: true,
      status_code: 200,
      response: allRecipes
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request.",
        errors: error
      }
    })
  }
}

//--------------------------- GET RECIPES NOT ADDED BY USERS CONTROLLER ---------------------------//
export const getRecipesNoUser = async (req, res) => {
  try {
    const allRecipesNoUser = await Recipe.find({ addedBy: undefined })

    res.status(200).json({
      success: true,
      status_code: 200,
      response: allRecipesNoUser
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request.",
        errors: error
      }
    })
  }
}

//--------------------------- GET RECIPES ADDED BY SPECIFIC USER CONTROLLER ---------------------------//
export const getRecipesByUserId = async (req, res) => {
  const { userId } = req.params

  try {
    const allRecipesByUserId = await Recipe.find({ addedBy: userId })

    res.status(200).json({
      success: true,
      status_code: 200,
      response: allRecipesByUserId
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request.",
        errors: error
      }
    })
  }
}

//--------------------------- GET SINGLE RECIPE CONTROLLER ---------------------------//
export const getSingleRecipe = async (req, res) => {
  const { recipeId } = req.params

  try {
    const singleRecipe = await Recipe.findById(recipeId)

    if (singleRecipe) {
      res.status(200).json({
        success: true,
        status_code: 200,
        response: singleRecipe
      })
    } else {
      res.status(404).json({
        success: false,
        status_code: 400,
        response: {
          message: "Recipe not found.",
          errors: error
        }
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request.",
        errors: error
      }
    })
  }
}

//--------------------------- EDIT RECIPE CONTROLLER ---------------------------//
export const editRecipe = async (req, res) => {
  const { recipeId } = req.params

  try {
    const listOfProperties = Object.keys(req.body)
    const fieldsToEdit = {}

    listOfProperties.map(singleField => {
      fieldsToEdit[singleField] = req.body[singleField]
    })

    await Recipe.findByIdAndUpdate(recipeId, fieldsToEdit)

    res.status(200).json({
      success: true,
      status_code: 200,
      response: {
        message: "Recipe has been updated."
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request, could not find and update this recipe.",
        error: err.errors
      }
    })
  }
}


//--------------------------- DELETE RECIPE CONTROLLER ---------------------------//
export const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params

  try {
    await Recipe.findByIdAndDelete(recipeId)

    res.status(200).json({
      success: true,
      status_code: 200,
      response: {
        message: "Recipe has been deleted."
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request, could not find and delete this recipe.",
        error: err.errors
      }
    })
  }
}
