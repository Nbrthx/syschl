const express= require("express")
const path = require("path")
const pg = require("pg")
const cjs = require("crypto-js")
const bp = require("body-parser")

const app = express()
const port = process.env.PORT || 8080

const config = {
    connectionString: "postgres://ycondiiz:SSEV0817KPhpRec6bHWHHZb1SI-uFaUp@topsy.db.elephantsql.com/ycondiiz",
    ssl: { rejectUnauthorized: false }
}
const pool = new pg.Pool(config)

app.use(express.static(path.join(__dirname, "public")))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get("/api", async (req, res) => {
    if(req.query.for == "login"){
        const id = req.query.id
        const pw = req.query.pw
        pool.query("select id, password from users where id='"+id+"'", (err, row) => {
            const data = row.rows[0]
            const decpw = data.password ? cjs.AES.decrypt(data.password, "justlnh").toString(cjs.enc.Utf8) : null
            console.log(decpw)
            if(data.id == id && decpw && decpw == pw)
                res.json({ id: id })
            else res.json({})
        })
    }
    else if(req.query.for == "exist"){
        const id = req.query.id
        pool.query("select id from users where id='"+id+"'", (err, row) => {
            const data = row.rows[0] || {}
            if(data.id) res.json({ id: id })
            else res.json({})
        })
    }
    else if(req.query.for == "register"){
        const id = req.query.id
        const name = req.query.name
        const pw = req.query.pw
        const tier = req.query.tier
        const decpw = cjs.AES.encrypt(pw, "justlnh")
        pool.query("insert into users values ('"+id+"', '"+decpw+"', '"+name+"', 0, 0, '"+tier+"')", (err, data) => {
            if(err) throw err
            else if(data.rowCount > 0) res.json({ succes: true })
            else res.json({ succes: false })
        })
    }
    else if(req.query.for == "data"){
        const id = req.query.id
        const data = await pool.query("select * from users where id='"+id+"'")
        res.json(data.rows[0] || {})
    }
    else if(req.query.for == "list-task"){
        const tier = req.query.tier
        const data = await pool.query("select id, name from taskmc where tiers='"+tier+"'")
        res.json(data.rows || [])
    }
    else if(req.query.for == "task"){
        const id = req.query.id
        const data = await pool.query("select * from taskmc where id='"+id+"'")
        res.json(data.rows[0] || {})
    }
    else if(req.query.for == "list-tiers"){
        const id = req.query.id
        const data = await pool.query("select * from tiers")
        res.json(data.rows || [])
    }
    else res.json({})
})
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
})

app.listen(port, () => console.log("Listen on "+port))
