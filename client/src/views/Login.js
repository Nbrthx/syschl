import React from "react"
import Cookies from "universal-cookie"
import Cjs from "crypto-js"

const cookies = new Cookies()

const Login = () => {
  const user = cookies.get("user")

  const [result, setResult] = React.useState()
  const [name, setName] = React.useState()
  const [password, setPassword] = React.useState()

  const nameChange = (e) => setName(e.target.value)
  const passwordChange = (e) => setPassword(e.target.value)
  
  const [msg, setMsg] = React.useState()

  React.useEffect(() => {
    fetch("/api?for=login&&user=nbrthx")
        .then(res => setResult(res.json()))
  }, []);

  const signIn = () => {
    if(!result) return;
    var uname = result.uname
    var pword = Cjs.AES.decrypt(result.pword, process.env.PSPH).toString(Cjs.enc.Utf8)
    if(!uname) setMsg("Username Not Found")
    else if(uname === name.toLowerCase() && pword === password){
      cookies.set("user", name.toLowerCase(), { path: "/" })
      window.location.href = "/"
    }else setMsg("Username or Password Incorrect!")
  }

  if(user != null) window.location.href = "/"

  return (
    <div className="login-page">
      <h1>Syscuhl App</h1>
       <p>{msg}</p>
       <label>Name</label><br />
       <input type="text" value={name} onChange={nameChange}/><br />
       <label>Password</label><br />
       <input type="password" value={password} onChange={passwordChange} /><br />
       <button onClick={signIn}>Login</button><br />
       {result}
    </div>
  )
}

export default Login
