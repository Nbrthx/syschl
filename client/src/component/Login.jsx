import React from "react"
import Cookies from "universal-cookie"
import Cjs from "crypto-js"

const cookies = new Cookies()

const Login = () => {
  const user = cookies.get("user")
  if(user != null){
    window.location.href = "/"
    return null
  }

  const [psph, setPsph] = React.useState("")
  const [name, setName] = React.useState("")
  const [pw, setPw] = React.useState("")
  const [disbl, setDisbl] = React.useState(false)

  const nameChange = (e) => setName(e.target.value)
  const pwChange = (e) => setPw(e.target.value)
  
  const [msg, setMsg] = React.useState()

  const getPsph = () => {
    fetch("/gpsph", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'thisfromserv' })
    })
    .then(res => res.json())
    .then(data => { if(data.psph) setPsph(data.psph) })
  }

  const signIn = (results) => {
    if(name === "" || pw === ""){
      setMsg("Input must be filled")
      setDisbl(false)
    }
    else if(results.uname != null){
      var uname = results.uname
      var pword = Cjs.AES.decrypt(results.pword, psph).toString(Cjs.enc.Utf8)
      if(uname === name.toLowerCase() && pword === pw){
        cookies.set("user", name.toLowerCase(), { path: "/" })
        window.location.href = "/"
        setDisbl(false)
      }
      else{
        setMsg("Username or password incorrect!")
        setDisbl(false)
      }
    }else{
      setMsg("Username or password incorrect!")
      setDisbl(false)
    }
  }

  const getSign = () => {
    setDisbl(true)
    fetch("/api?for=login&&user="+name)
    .then(res => res.json())
    .then(data => { signIn(data) })
  }

  window.onload = () => { getPsph() }

  return (
    <div className="form">
      <div className="card">
        <h1>Syscuhl App</h1>
        <label className="red">{msg}</label><br />
        <label>Name</label><br />
        <input className="text" type="text" value={name} onChange={nameChange}/><br />
        <label>Password</label><br />
        <input className="text" type="password" value={pw} onChange={pwChange} /><br />
        <button className="submit" disabled={disbl} onClick={getSign}>Login</button><br />
      </div>
    </div>
  )
}

export default Login
