import React from "react"
import Cookies from "universal-cookie"
import Pg from "pg"
import Cjs from "crypto-js"

const cookies = new Cookies()
const pool = new Pg.Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }
})

const Login = () => {
  const user = cookies.get("user")

  var name = ""
  var password = ""
  const [msg, setMsg] = React.useState()

  const signIn = () => {
    pool.query("select uname, pword from users where uname='"+name+"'",
      (err, data) => {
      var uname = data.rows[0].uname
      var pword = Cjs.AES.decrypt(data.rows[0].pword).toString(Cjs.enc.Utf8)
      if(uname === name.toLowerCase() && pword === password){
        cookies.set("user", name.toLowerCase(), { path: "/" })
        window.location.href = "/"
      }else setMsg("Incorrect Input!")
    })
  }

  if(user != null) window.location.href = "/"

  return (
    <div className="login-page">
      <h1>Syscuhl App</h1>
       <p>{msg}</p><br />
       <label>Name</label><br />
       <input type="text" value={name} /><br />
       <label>Password</label><br />
       <input type="password" value={this.password} /><br />
       <button onClick={signIn}>Login</button>
    </div>
  )
}

export default Login
