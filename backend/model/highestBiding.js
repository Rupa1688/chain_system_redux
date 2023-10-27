const mongoose = require("mongoose")

const highestBidingSchema = new mongoose.Schema({
  amount: { type: Number },
  shares: { type: Number },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  holder_id: { type: mongoose.Schema.Types.ObjectId },
  org_id: { type: mongoose.Schema.Types.ObjectId },
  bid: { type: Number },
  time: { type: Date },
  status: { type: Boolean },
})

const HighestBidingSchema = mongoose.model(
  "highestBidingSchema",
  highestBidingSchema
)
module.exports = HighestBidingSchema
