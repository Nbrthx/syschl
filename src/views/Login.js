import React from "react"
import Cookies from "universal-cookie"
import Cjs from "crypto-js"

const cookies = new Cookies()

const Login = () => {
  const user = cookies.get("user")

  var name = ""
  var password = ""
  const [msg, setMsg] = React.useState()

  const signIn = () => {
      var uname = "nbrthx"
      var pword = "12345678" || Cjs.AES.decrypt("12345678", "justlnh").toString(Cjs.enc.Utf8)
      if(uname === name.toLowerCase() && pword === password){
        cookies.set("user", name.toLowerCase(), { path: "/" })
        window.location.href = "/"
      }else setMsg("Incorrect Input!")
  }

  if(user != null) window.location.href = "/"

  return (
    <div className="login-page">
      <h1>Syscuhl App</h1>
       <p>{msg}</p><br />
       <label>Name</label><br />
       <input type="text" value={name} /><br />
       <label>Password</label><br />
       <input type="password" value={password} /><br />
       <button onClick={signIn}>Login</button>
    </div>
  )
}

export default Login
