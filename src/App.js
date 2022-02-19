import React from "react"

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

  render() {
    return (
      <div>
        <h1>Test App</h1>
        <Name name={this.state.name} /> 
        <br /><br />
        <input type="text" value={this.value} onChange={this.change} />
      </div>
    )
  }
}

export default App
