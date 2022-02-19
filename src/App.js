import React from "react"
import Cookies from "universal-cookie"

const cookies = new Cookies()

function Name(props) {
  return (<p>Hello {props.name}</p>)
}

class App extends React.Component{
  state = {
    name: "Jhon Doe"
  }
  
  value = ""
  change = (e) => {
    this.value = e.target.value
    this.setState({ name: this.value })
  }

  userCk = () => {
    cookies.set("user", this.state.name, { path: "/" })
  }

  render() {
    return (
      <div>
        <h1>Test App</h1>
        <Name name={cookies.get("user")} /> 
        <br /><br />
        <input type="text" value={this.value} onChange={this.change} /><br />
        <button onClick={this.userCk}>Submit</button>
      </div>
    )
  }
}

export default App
