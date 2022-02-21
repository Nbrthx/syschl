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
    res.json(
      (await pool.query("select uname, pword from users where uname='"+user+"'")
    ).rows[0])
  }
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+"/client/build", "index.html"))
})

app.listen(port, () => console.log("Listen on "+port))

