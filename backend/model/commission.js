const mongoose = require("mongoose")

const commisionSchema = new mongoose.Schema({
  user_reference_Id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  commision: { type: String, default: null },
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
})

const Commision = mongoose.model("Commision", commisionSchema)
module.exports = Commision
