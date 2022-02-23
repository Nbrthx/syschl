import React from "react"
import Cookies from "universal-cookie"
import Cjs from "crypto-js"

const cookies = new Cookies()

const Login = () => {
  const user = cookies.get("user")

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
    .then(data => setResults([data.uname, data.pword]))
  }

  React.useEffect(() => signIn(), [results])

  if(user != null) window.location.href = "/"
  else return (
    <div className="login-page">
      <h1>Syscuhl App</h1>
       <p>{msg}</p>
       <label>Name</label><br />
       <input type="text" value={name} onChange={nameChange}/><br />
       <label>Password</label><br />
       <input type="password" value={pw} onChange={pwChange} /><br />
       <button onClick={getSign}>Login</button><br />
    </div>
  )
}

export default Login