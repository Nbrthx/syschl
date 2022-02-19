import React from "react"

function Name(props) {
  return (<p>Hello {props.name}</p>)
}

class App extends React.Component{
  state = {
    name: "Jhon Doe"
  }
  
  change = (e) => {
    
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <div>
        <h1>Test App</h1>
        <Name name={this.state.name} /> 
        <br /><br />
        <input type="text" value="" onChange={this.change} />
      </div>
    )
  }
}

export default App
