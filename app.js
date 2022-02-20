const express = require("express")
const app = express()

const port = process.env.PORT || 3001

app.("/api", (req, res) => {
  res.json({"name": "Niberthix"})
})

app.listen(port, () => console.log("Listen on "+port))

