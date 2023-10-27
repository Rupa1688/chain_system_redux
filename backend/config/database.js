const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const url = process.env.MONGO_URI
console.log("hello", url)

mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to database")
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...")
    console.error(error)
  })
