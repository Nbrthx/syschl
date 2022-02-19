import React from "react"
imort Ck from "react-cookie"

function Name(props) {
  return (<p>Hello {props.name}</p>)
}

class App extends React.Component{
  const [cookies, setCookies, removeCookies] = Ck.useCookies()
  state = {
    name: "Jhon Doe"
  }
  
  value = ""
  change = (e) => {
    this.value = e.target.value
    this.setState({ name: this.value })
  }

  userCk = () => {
    this.setCookies("user", this.state.name, { path: "/" })
  }

  render() {
    return (
      <div>
        <h1>Test App</h1>
        <Name name={this.cookies.user} /> 
        <br /><br />
        <input type="text" value={this.value} onChange={this.change} /><br />
        <button onClick={this.userCk}>Submit</button>
      </div>
    )
  }
}

export default App
