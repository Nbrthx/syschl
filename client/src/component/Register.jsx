import React from "react"
import Cookies from "universal-cookie"
import Cjs from "crypto-js"

const cookies = new Cookies()

const Register = () => {
  const user = cookies.get("user")
  if(user != null){
    window.location.href = "/"
    return null
  }

  const [psph, setPsph] = React.useState("")
  const [fname, setFname] = React.useState("")
  const [name, setName] = React.useState("")
  const [pw, setPw] = React.useState("")
  const [repw, setRepw] = React.useState("")
  const [disbl, setDisbl] = React.useState(false)

  const fnameChange = (e) => setFname(e.target.value)
  const nameChange = (e) => setName(e.target.value)
  const pwChange = (e) => setPw(e.target.value)
  const repwChange = (e) => setRepw(e.target.value)
  
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

  const signUp = (exist) => {
    if(!name || !pw || !repw || !fname ){
      setMsg("Input must be filled")
      setDisbl(false)
    }
    else if(pw.length < 8){
      setMsg("Password must be 8 digit")
      setDisbl(false)
    }
    else if(pw !== repw){
      setMsg("Password & Repassword must be same")
      setDisbl(false)
    }
    else if(!exist && psph){
      const encpw = Cjs.AES.encrypt(String(pw), psph).toString()
      console.log(encpw)
      fetch("/api?for=register&&fname="+fname+"&&name="+name+"&&pw="+encpw)
      .then(res => res.json())
      .then(data => { data.succes ? window.location.href = "/" : setMsg("Something Wrong") })
      setDisbl(false)
    }
    else{
      setMsg("Username already used")
      setDisbl(false)
    }
  }

  const getSign = () => {
    setDisbl(true)
    fetch("/api?for=login&&user="+name)
    .then(res => res.json())
    .then(data => { data.uname ? signUp(true) : signUp(false) })
  }

  window.addEventListener("beforeunload", alert("Hello"))

  window.onload = () => { getPsph() }

  return (
    <div className="form">
      <div className="card">
        <h1>Syscuhl App</h1>
        <label className="red">{msg}</label><br />
        <label>Name</label><br />
        <input className="text" type="text" value={fname} onChange={fnameChange}/><br />
        <label>Username</label><br />
        <input className="text" type="text" value={name} onChange={nameChange}/><br />
        <label>Password</label><br />
        <input className="text" type="password" value={pw} onChange={pwChange}/><br />
        <label>Re-Password</label><br />
        <input className="text" type="password" value={repw} onChange={repwChange} /><br />
        <button className="submit" disabled={disbl} onClick={getSign}>Register</button><br />
      </div>
    </div>
  )
}

export default Register