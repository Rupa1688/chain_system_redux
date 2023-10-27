const mongoose = require("mongoose")

const orgShareMarketSchema = new mongoose.Schema({
  org_share_price: { type: Number, default: null },
  share_amount: { type: Number, default: 10 },
  user_share_amount: { type: Number, default: 10 },
  org_id: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  orgName: { type: String, ref: "Organization" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: Boolean },
})

const OrganizationShareAmount = mongoose.model(
  "orgShareMarketSchema",
  orgShareMarketSchema
)
module.exports = OrganizationShareAmount
