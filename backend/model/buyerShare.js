const mongoose = require("mongoose")

const buyUserSchema = new mongoose.Schema({
  // user_share_amount: { type: Number },
  shares: { type: Number },
  org_id: { type: mongoose.Schema.Types.ObjectId },
  admin_id: { type: mongoose.Schema.Types.ObjectId },
  user_id: { type: mongoose.Schema.Types.ObjectId },
})

const BuyUserSchema = mongoose.model("SharesUserSchema", buyUserSchema)
module.exports = BuyUserSchema
