import React from "react"

const Name = ({props}) => {
  return (<p>Hello {props.name}</p>)
}

class App extends React.Component{
  state = {
    name: "Jhon Doe"
  }

  change = () => {
    this.setState({ name: this.state.name })
  }

  render() {
    return (
      <div>
        <h1>Test App</h1>
        <Name name={this.state.name} /> 
        <br /><br />
        <input type="text" value={this.state.name} />
        <button onClick={this.change}>Submit</button>
      </div>
    )
  }
}

export default App
