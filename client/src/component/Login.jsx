import React from "react"
import Cookies from "universal-cookie"
import Cjs from "crypto-js"

const cookies = new Cookies()

const Login = () => {
  const user = cookies.get("user")
  if(user == null){
    window.location.href = "/"
    return null
  }

  const [results, setResults] = React.useState([])
  const [name, setName] = React.useState("")
  const [pw, setPw] = React.useState("")

  const nameChange = (e) => setName(e.target.value)
  const pwChange = (e) => setPw(e.target.value)
  
  const [msg, setMsg] = React.useState()

  const signIn = () => {
    if(results[0] != null){
      var uname = results[0]
      var pword = Cjs.AES.decrypt(results[1], "justlnh").toString(Cjs.enc.Utf8)
      if(uname === name.toLowerCase() && pword === pw){
        cookies.set("user", name.toLowerCase(), { path: "/" })
        window.location.href = "/"
      }
      else setMsg("Username or Password Incorrect!")
    }
  }

  const getSign = () => {
    fetch("/api?for=login&&user="+name)
    .then(res => res.json())
    .then(data => { if(data.uname) setResults([data.uname, data.pword]) })
  }

  React.useEffect(() => signIn(), [results])

  return (
    <div className="form">
      <div className="card">
        <h1>Syscuhl App</h1>
        <label>{msg}</label><br />
        <label>Name</label><br />
        <input type="text" value={name} onChange={nameChange}/><br />
        <label>Password</label><br />
        <input type="password" value={pw} onChange={pwChange} /><br />
        <button className="submit" onClick={getSign}>Login</button><br />
      </div>
      <p>{process.env}</p>
    </div>
  )
}

export default Login
