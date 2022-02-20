const express = require("express")
const path = require("path")
const app = express()

const port = process.env.PORT || 3001

app.get("/api", (req, res) => {
  res.json({"name": "Niberthix"})
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, '/client/build', 'index.html'))
})

app.listen(port, () => console.log("Listen on "+port))

