const express = require("express")
const path = require("path")
const pg = require("pg")
const app = express()

const port = process.env.PORT || 3001

const config = {
  connectionString: "postgres://vgmmvdzlgszvqy:56d8260fd3c2e3da3149b77ec29764ff8d97c1bff70a8bb4a4765a6cb8e193dd@ec2-54-157-15-228.compute-1.amazonaws.com:5432/d44e62pftbun22",
  ssl: { rejectUnauthorized: false }
}
const pool = new pg.Pool(config)

app.use(express.static(__dirname+"/client/build"))

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
  else if(req.query.for == "tugas"){
    const kelas = req.query.kelas
    const data = await pool.query("select * from tugas where kelas='"+kelas+"'")
    res.json(data.rows[0] || {})
  }
  else res.json({})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+"/client/build", "index.html"))
})

app.listen(port, () => console.log("Listen on "+port))

