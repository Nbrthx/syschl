const express= require("express")
const path = require("path")
const pg = require("pg")
const cjs = require("crypto-js")
const bp = require("body-parser")
const cp = require("cookie-parser")

const app = express()
const port = process.env.PORT || 8080
const psph = process.env.PSPH

const config = {
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
}
const pool = new pg.Pool(config)

app.use(express.static(path.join(__dirname, "public")))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cp())

app.post("/decrypt", (req, res) => {
    const value = req.body.value || ""
    console.log(value)
    const decv = cjs.AES.decrypt(value, psph).toString(cjs.enc.Utf8)
    res.json({ result: decv })
})
app.get("/api", async (req, res) => {
    if(req.query.for == "login"){
        const id = req.query.id
        const pw = req.query.pw
        pool.query("select id, password from users where id='"+id+"'", (err, row) => {
            const data = row.rows[0] || {}
            const decpw = data.password ? cjs.AES.decrypt(data.password, psph).toString(cjs.enc.Utf8) : null
            if(data.id == id && decpw && decpw == pw){
                res.cookie("user", cjs.AES.encrypt(id, psph).toString())
                res.json({ id: id })
            }
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
        const decpw = cjs.AES.encrypt(pw, psph)
        pool.query("insert into users values ('"+id+"', '"+decpw+"', '"+name+"', 0, 0, '"+tier+"')", (err, data) => {
            if(err) throw err
            else if(data.rowCount > 0){
                res.cookie("user", cjs.AES.encrypt(id, psph).toString())
                res.json({ succes: true })
            }
            else res.json({ succes: false })
        })
    }
    else if(req.query.for == "data"){
        const id = req.query.id ? cjs.AES.decrypt(req.query.id, psph).toString(cjs.enc.Utf8) : ""
        const data = await pool.query("select * from users where id='"+id+"'")
        res.json(data.rows[0] || {})
    }
    else if(req.query.for == "list-task"){
        const tier = req.query.tier
        const id = cjs.AES.decrypt(req.query.id, psph).toString(cjs.enc.Utf8)
        const data = (await pool.query("select id, name from taskmc where tiers='"+tier+"'")).rows
        const taskdone = (await pool.query("select taskid from collecttask where userid='"+id+"'")).rows
        
        let newarr = data.map(i => { return i.id })

        taskdone.map(i => { if(newarr.includes(i.taskid)) data.splice(data.indexOf(i.taskid), 1) })

        res.json(data || [])
    }
    else if(req.query.for == "task"){
        const id = req.query.id
        const data = await pool.query("select * from taskmc where id='"+id+"'")
        res.json(data.rows[0] || {})
    }
    else if(req.query.for == "answer"){
        const id = cjs.AES.decrypt(req.query.id, psph).toString(cjs.enc.Utf8)
        const task = req.query.task
        const answer = (req.query.answer || "").replace("[", "{").replace("]", "}")
        const tlength = (await pool.query("SELECT count(*) AS i FROM tiers")).rows[0].i++
        pool.query("insert into collecttask values ("+tlength+",'"+task+"', '"+id+"', '"+answer+"')", (err, data) => {
            if(err) throw err
            else if(data.rowCount > 0) res.json({ succes: true })
            else res.json({ succes: false })
        })
    }
    else if(req.query.for == "list-tiers"){
        const data = await pool.query("select * from tiers")
        res.json(data.rows || [])
    }
    else res.json({})
})
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
})

app.listen(port, () => console.log("Listen on "+port))
