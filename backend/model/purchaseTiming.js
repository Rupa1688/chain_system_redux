const mongoose = require("mongoose")

const purchchaseSchema = new mongoose.Schema({
  bid_id: { type: mongoose.Schema.Types.ObjectId },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  time: { type: Date },
})

const PurchchaseSchema = mongoose.model("purchchaseSchema", purchchaseSchema)
module.exports = PurchchaseSchema
