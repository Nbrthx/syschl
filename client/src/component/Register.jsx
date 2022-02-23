import React from "react"
import Cookies from "universal-cookie"
import Cjs from "crypto-js"

const cookies = new Cookies()

const Register = () => {
  const user = cookies.get("user")

  const [exist, setExist] = React.useState(false)

  const [fname, setFname] = React.useState("")
  const [name, setName] = React.useState("")
  const [pw, setPw] = React.useState("")
  const [repw, setRepw] = React.useState("")

  const fnameChange = (e) => setFname(e.target.value)
  const nameChange = (e) => setName(e.target.value)
  const pwChange = (e) => setPw(e.target.value)
  const repwChange = (e) => setRepw(e.target.value)
  
  const [msg, setMsg] = React.useState()

  const signUp = () => {
    if(name === "" || pw === "" || repw === "" || fname === "") setMsg("Input must be filled")
    else if(pw.size() < 8) setMsg("Password must be 8 digit")
    else if(pw != repw) setMsg("Password & Repassword must be same")
    else if(!exist){
      const encpw = Cjs.AES.encrypt(pw, process.env.PSPH)
      fetch("/api?for=register&&fname="+fname+"&&name="+name+"&&pw="+encpw)
      window.location.href = "/"
    }
    else setMsg("Username already used")
  }

  const getSign = () => {
    fetch("/api?for=login&&user="+name)
    .then(res => res.json())
    .then(data => {
      if(data.uname) setExist(true)
      else setExist(false)
    })
  }

  React.useEffect(() => {
    if(name != "") signUp()
  }, [exist])

  if(user != null) window.location.href = "/"
  else return (
    <div className="login-page">
      <h1>Syscuhl App</h1>
       {msg}<br />
       <label>Name</label><br />
       <input type="text" value={fname} onChange={fnameChange}/><br />
       <label>Username</label><br />
       <input type="text" value={name} onChange={nameChange}/><br />
       <label>Name</label><br />
       <input type="text" value={pw} onChange={pwChange}/><br />
       <label>Password</label><br />
       <input type="password" value={repw} onChange={repwChange} /><br />
       <button onClick={getSign}>Register</button><br />
    </div>
  )
}

export default Register
