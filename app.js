const express = require("express")
const path = require("path")
const pg = require("pg")
const app = express()

const port = process.env.PORT || 3001

const config = {
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }
}
const pool = pg.Pool(config)

app.use(express.static(__dirname+"/client/build"))

app.get("/api", (req, res) => {
  if(req.query.for == "login"){
    const user = req.query.user
    pool.query("select uname, pword from users where uname='"+user+"'", (err, data) => {
      res.json(data.rows[0])
    })
  }
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+"/client/build", "index.html"))
})

app.listen(port, () => console.log("Listen on "+port))

