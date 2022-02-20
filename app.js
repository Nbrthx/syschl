const express = require("express")
const path = require("path")
const app = express()

const port = process.env.PORT || 3001

app.use(express.static(__dirname+"/client/build"))

app.get("/api", (req, res) => {
  res.json({"name": "Niberthix"})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+"/client/build", "index.html"))
})

app.listen(port, () => console.log("Listen on "+port))

