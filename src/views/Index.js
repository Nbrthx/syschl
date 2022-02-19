import React from "react"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const Index = () => {
  const user = cookies.get("user")

  if(user != null){
    return (
      <div>
        <h1>Hello {user}</h1>
        Welcome to React Test App
      </div>
    )
  }
  return(
    <div>
      <h1>Syscuhl App</h1>
      Not logged in, login on <a href="login">here</a>
    </div>
  )
}

export default Index
