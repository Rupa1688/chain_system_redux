const mongoose = require("mongoose")

const organizationSchema = new mongoose.Schema({
  organizationName: { type: String, default: null },

  amount: { type: String, default: null },
  // agentAmount: { type: String, default: null },
  // userAmount: { type: String, default: null },

  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

const Organization = mongoose.model("Organization", organizationSchema)
module.exports = Organization
