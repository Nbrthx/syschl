const express = require("express")
const path = require("path")
const pg = require("pg")
const app = express()

const port = process.env.PORT || 3001
const psph = process.env.PSPH

const config = {
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }
}
const pool = new pg.Pool(config)

app.use(express.static(__dirname+"/client/build"))

app.post("/gpsph", (req, res) => {
  res.json({ "psph": psph })
})

app.get("/api", async (req, res) => {
  if(req.query.for == "login"){
    const user = req.query.user
    const data = await pool.query("select uname, pword from users where uname='"+user+"'")
    res.json(data.rows[0] || {})
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
  else if(req.query.for == "data"){
    const user = req.query.user
    const data = await pool.query("select * from users where uname='"+user+"'")
    res.json(data.rows[0] || {})
  }
  else if(req.query.for == "list_tugas"){
    const kelas = req.query.kelas
    const data = await pool.query("select id, name from tugas where kelas='"+kelas+"'")
    res.json(data.rows || [])
  }
  else if(req.query.for == "tugas"){
    const id = req.query.id
    const data = await pool.query("select * from tugas where id='"+id+"'")
    res.json(data.rows[0] || {})
  }
  else res.json({})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+"/client/build", "index.html"))
})

app.listen(port, () => console.log("Listen on "+port))

