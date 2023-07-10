import { useState } from 'react'

const CountDisplay = ({ counter }) => {
  console.log("Rerendering display")
  return <div>{counter}</div>
}

const Button = ({ buttonFunction, text }) => {
  console.log("Rerendering button")
  return (
    <button onClick={buttonFunction}>
      {text}
    </button>);
}

const App = () => {

  const [counter, setCounter] = useState(0)
  console.log("Rerendering app")

  const incrementCounter = () => setCounter(counter + 1)
  const resetCounter = () => setCounter(0)
  const decrementCounter = () => setCounter(counter - 1)


  return (
    <>
      <CountDisplay counter={counter} />
      <Button buttonFunction={incrementCounter} text={"inc"} />
      <Button buttonFunction={resetCounter} text={"reset"} />
      <Button buttonFunction={decrementCounter} text={"dec"} />
    </>
  )
}

export default App