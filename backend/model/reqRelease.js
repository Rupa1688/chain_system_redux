const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
  org_id: { type: mongoose.Schema.Types.ObjectId },
  org_name: { type: String, default: null },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  user_name: { type: String },
  role: { type: String, default: null },
  req_status: { type: Boolean },
})
requestSchema.index({ org_name: "text" })

const User = mongoose.model("requestUser", requestSchema)
module.exports = User
