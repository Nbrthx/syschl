import React from "react"
import Cookies from "universal-cookie"
import Cjs from "crypto-js"

const cookies = new Cookies()

const Register = () => {
  const user = cookies.get("user")

  const [exist, setExist] = React.useState(false)

  const [name, setName] = React.useState("")
  const [name, setName] = React.useState("")
  const [pw, setPw] = React.useState("")
  const [repw, setRepw] = React.useState("")

  const fnameChange = (e) => setFname(e.target.value)
  const nameChange = (e) => setName(e.target.value)
  const pwChange = (e) => setPw(e.target.value)
  const repwChange = (e) => setRepw(e.target.value)
  
  const [msg, setMsg] = React.useState()

  const signUp = () => {
    if(results[0] != null){
      console.log(results.map((result) => result+" "))
      var uname = results[0]
      var pword = Cjs.AES.decrypt(results[1], "justlnh").toString(Cjs.enc.Utf8)
      if(!uname) setMsg("Username Not Found")
      else if(uname === name.toLowerCase() && pword === pw){
        cookies.set("user", name.toLowerCase(), { path: "/" })
        window.location.href = "/"
      }
      else setMsg("Username or Password Incorrect!")
    }
  }

  const getSign = () => {
    fetch("/api?for=login&&user="+name)
    .then(res => res.json())
    .then(data => setExist(true))
    const encpw = Cjs.AES.encrypt(
    fetch("/api?for=register&&fname="+fname+"&&name="+name+"&&pw="+pw+"
  }

  React.useEffect(() => signIn(), [results])

  if(user != null) window.location.href = "/"

  return (
    <div className="login-page">
      <h1>Syscuhl App</h1>
       <p>{msg}</p>
       <label>Name</label><br />
       <input type="text" value={name} onChange={nameChange}/><br />
       <label>Password</label><br />
       <input type="password" value={password} onChange={passwordChange} /><br />
       <button onClick={getSign}>Login</button><br />
    </div>
  )
}

export default Register
