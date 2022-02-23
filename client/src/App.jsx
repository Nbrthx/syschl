import React from "react"

import Index from "./component/Index"
import Login from "./component/Login"
import Register from "./component/Register"

function Router(props) {
  if(window.location.pathname === props.path)
    return <props.page />
  else return (<></>)
}

class App extends React.Component{
  render() {
    return (
      <div class="App">
        <Router path="/" page={Index} />
        <Router path="/login" page={Login} />
        <Router path="/register" page={Register} />
      </div>
    )
  }
}

export default App
