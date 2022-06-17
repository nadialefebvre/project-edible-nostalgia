import mongoose from "mongoose"
import crypto from "crypto"

const UserSchema = new mongoose.Schema({
  firstName: String,
  email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
	},
  password: {
    type: String,
    required: true,
  },
  // recipes: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		default: [],
	// 		ref: 'recipe',
	// 	},
	// ],
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

const User = mongoose.model("User", UserSchema)

export default User
