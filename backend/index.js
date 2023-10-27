// require("dotenv").config()
require("dotenv").config()
require("./config/database")
const express = require("express")
var cors = require("cors")
const app = express()
// const http = require("http")
var server = require("http").createServer(app)
// const server = http.createServer(app)
// console.log("server11", server)
app.use(cors())
const WebSocket = require("ws")

const wss = new WebSocket.Server({ server })
wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data, isBinary) {
    const message = isBinary ? data : data.toString()
    console.log("data", message)
    wss.clients.forEach(function each(client) {
      // console.log("client", client)
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message)
        // console.log("data", message)
      }
    })
  })
})
app.use(express.json())
const userRouter = require("./router/userRouter")

app.use("/user", userRouter)

//const { API_PORT } = process.env;
const port = process.env.PORT
console.log("po", port)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app
