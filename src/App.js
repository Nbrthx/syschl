import React from "react"
// import Cookies from "universal-cookie"

import Index from "./views/Index"

// const cookies = new Cookies()

function Router(props) {
  if(String(window.location.pathname) == String(props.path))
    return props.page
  return (<></>)
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
