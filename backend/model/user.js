const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  // prize: { type: Number },
  role: { type: String, default: null },
  ref_id: { type: mongoose.Schema.Types.ObjectId },
})
userSchema.index({ name: "text", email: "text" })

const User = mongoose.model("User", userSchema)
module.exports = User
