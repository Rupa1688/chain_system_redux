const mongoose = require("mongoose")

const bidingSchema = new mongoose.Schema({
  amount: { type: Number },
  shares: { type: Number },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  org_id: { type: mongoose.Schema.Types.ObjectId },
})

const BidingSchema = mongoose.model("biding", bidingSchema)
module.exports = BidingSchema
