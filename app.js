const express = require("express")
const path = require("path")
const pg = require("pg")
const app = express()

require("dotenv").config()

const port = process.env.PORT || 3001

const config = {
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }
}
const pool = new pg.Pool(config)

app.use(express.static(__dirname+"/client/build"))

app.get("/api", async (req, res) => {
  if(req.query.for == "login"){
    const user = req.query.user
    res.json(
      (await pool.query("select uname, pword from users where uname='"+user+"'")
    ).rows[0] || {})
  }
  else if(req.query.for == "register"){
    const fname = req.query.fname
    const name = req.query.name
    const pw = req.query.pw
    pool.query("insert into users values ('"+name+"', '"+fname+"', '"+pw+"', 0, 0)", (err, data) => {
      if(err) throw err
      else if(data.rowCount > 0) res.json({ succes: true })
      else res.json({ succes: false })
    })
  }
  else res.json({})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+"/client/build", "index.html"))
})

app.listen(port, () => console.log("Listen on "+port))

