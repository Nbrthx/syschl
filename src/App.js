import React from "react"
// import Cookies from "universal-cookie"

import Index from "./views/Index"
import Login from "./views/Login"

// const cookies = new Cookies()

function Router(props) {
  if(window.location.pathname === props.path)
    return {<props.page />}
  else return <p>Not Found</p>
}

class App extends React.Component{
  render() {
    return (
      <div class="App">
        <Router path="/" page={Index} />
        <Router path="/login" page={Login} />
      </div>
    )
  }
}

export default App
