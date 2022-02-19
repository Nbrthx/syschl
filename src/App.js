import React from "react"
import Cookies from "universal-cookie"

const cookies = new Cookies()

function Name(props) {
  return (<p>Hello {props.name}</p>)
}

class App extends React.Component{
  state = {
    name: cookies.get("user") || "Jhon Doe"
  }
  
  name = ""
  change = (e) => {
    this.name = e.target.value
  }

  userCk = () => {
    cookies.set("user", this.name, { path: "/" })
    setState({ name: this.name })
  }

  render() {
    return (
      <div>
        <h1>Test App</h1>
        <Name name={this.state.name} /> 
        <br /><br />
        <input type="text" value={this.value} onChange={this.change} /><br />
        <button onClick={this.userCk}>Submit</button>
      </div>
    )
  }
}

export default App
