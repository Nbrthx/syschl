import React from "react"

function Name(props){
  return (<p>Hello {props.name}</p>)
}

class App extends React.Component{
  state = {
    name: "Jhon Doe"
  }

  change = () => {
    setState({ name: state.name })
  }

  render() {
    return (
      <h1>Test App</h1>
      <Name name={state.name} /><br />
      <br />
      <input type="text" value={state.name} />
      <button onClick={change}>Submit</button>
    )
  }
}

export default App
