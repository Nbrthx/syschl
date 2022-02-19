import React from "react"
// import Cookies from "universal-cookie"

import Index from "./views/Index"

// const cookies = new Cookies()

function Router(props) {
  if(window.location.pathname === props.path)
    return (<div><{props.page} /></div>)
  else return <p>Not Found</p>
}

class App extends React.Component{
  render() {
    return (
      <div>
        <Router path="/" page={Index} />
      </div>
    )
  }
}

export default App
