import User from "../models/user"
import bcrypt from "bcrypt"

const emailValidation = (email) => {
  const emailPattern = /^\S+@\S+\.\S{2,}$/g

  if (!emailPattern.test(email)) {
    throw "Email must follow the pattern user@email.com"
  }
}

const passwordValidation = (password) => {
  const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

  if (!passwordPattern.test(password)) {
    throw "Password must include at least: 8 characters, 1 uppercase, 1 lowercase, 1 special (#?!@$%^&*-)."
  }
}

//--------------------------- USER REGISTRATION CONTROLLER ---------------------------//
export const registerUser = async (req, res) => {
  const { firstName, email, password } = req.body
  try {
    const salt = bcrypt.genSaltSync()
    const userExists = await User.findOne({ email })

    emailValidation(email)
    passwordValidation(password)

    if (userExists) {
      res.status(400).json({
        success: false,
        status_code: 400,
        response: {
          message: "Email already used."
        }
      })
    } else {
      const newUser = await new User({
        firstName: firstName,
        email: email,
        password: bcrypt.hashSync(password, salt)
      }).save()

      res.status(201).json({
        success: true,
        status_code: 201,
        response: {
          firstName: newUser.firstName,
          email: newUser.email,
          accessToken: newUser.accessToken,
          userId: newUser._id
        }
      })
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: err,
        errors: err.errors
      }
    })
  }
}

//--------------------------- ALL USERS CONTROLLER FOR DEV PURPOSE - TO REMOVE EVENTUALLY ---------------------------//
export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find()

    res.status(200).json({
      success: true,
      status_code: 200,
      response: allUsers
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request.",
        errors: err.errors
      }
    })
  }
}

//--------------------------- USER LOGIN CONTROLLER ---------------------------//
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        status_code: 200,
        response: {
          firstName: user.firstName,
          email: user.email,
          accessToken: user.accessToken,
          userId: user._id
        }
      })
    } else {
      res.status(400).json({
        success: false,
        status_code: 400,
        response: {
          message: "Email and password don't match."
        },
      })
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request.",
        errors: err.errors
      }
    })
  }
}

//--------------------------- EDIT PROFILE CONTROLLER - PASSWORD ---------------------------//
export const editProfilePassword = async (req, res) => {
  const { userId } = req.params
  const { password } = req.body

  try {
    const salt = bcrypt.genSaltSync()

    passwordValidation(password)

    await User.findByIdAndUpdate(
      userId, { password: bcrypt.hashSync(password, salt) }
    )

    res.status(200).json({
      success: true,
      status_code: 200,
      response: {
        message: "User has been updated."
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: err,
        errors: err.errors
      }
    })
  }
}

//--------------------------- EDIT PROFILE CONTROLLER - OTHER FIELDS ---------------------------//
export const editProfileOtherFields = async (req, res) => {
  const { userId } = req.params

  try {
    const listOfProperties = Object.keys(req.body)
    const fieldsToEdit = {}

    emailValidation(email)

    listOfProperties.map(singleField => {
      fieldsToEdit[singleField] = req.body[singleField]
    })

    await User.findByIdAndUpdate(userId, fieldsToEdit)

    res.status(200).json({
      success: true,
      status_code: 200,
      response: {
        message: "User has been updated."
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: error,
        errors: err.errors
      }
    })
  }
}

//--------------------------- ADD RATING TO USER CONTROLLER ---------------------------//
export const addRatingToUser = async (req, res) => {
  const { userId } = req.params
  const { recipeId, rating } = req.body

  try {
    const newRating = {
      recipeId,
      rating
    }
    await User.findByIdAndUpdate(userId, {
      $push: {
        ratings: newRating,
      },
    })

    res.status(200).json({
      success: true,
      status_code: 200,
      response: {
        message: "User rating has been added."
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request, could not find and add rating to this user.",
        errors: err.errors
      }
    })
  }
}

//--------------------------- GET PROFILE CONTROLLER ---------------------------//
export const getProfile = async (req, res) => {
  const { userId } = req.params

  try {
    const userProfile = await User.findById(userId)

    res.status(200).json({
      success: true,
      status_code: 200,
      response: userProfile
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request.",
        errors: err.errors
      }
    })
  }
}

//--------------------------- DELETE PROFILE CONTROLLER ---------------------------//
export const deleteProfile = async (req, res) => {
  const { userId } = req.params

  try {
    await User.findByIdAndDelete(userId)

    res.status(200).json({
      success: true,
      status_code: 200,
      response: {
        message: "User has been deleted."
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request, could not find and delete this user.",
        errors: err.errors
      }
    })
  }
}
