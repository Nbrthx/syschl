import React from "react"
import Cookies from "universal-cookie"
import Pg from "pg"

const cookies = new Cookies()
const pool = new Pg.Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }
})

const Login = () => {
  const user = cookies.get("user")

  var name = ""
  var password = ""

  if(user != null) window.location.href = "/"

  return(
    <div>
      <h1>Syscuhl App</h1>
       <label>Name</label><br>
       <input type="text" value={name}><br>
       <label>Password</label><br>
       <input type="password" value={password}>
       <button onClick={signIn}>Login</button>
    </div>
  )
}

export default Login
