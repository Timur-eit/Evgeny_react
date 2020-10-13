import React, {useState, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [iterator, setIterator] = useState(0)
  const [count, setCount] = useState(0)

  // const handleChangeIterator = () => {
  //   setIterator(iterator => {
  //     setCount(count => count + 1)
  //     return iterator + 1
  //   })
  // }

  const handleChangeIterator = useCallback(() => {
    setIterator(iterator + 1)
    setCount(count + 1)
  }, [iterator, count])

  console.log("render")

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <span onClick={handleChangeIterator}>{iterator}{count}</span>
      </header>
    </div>
  );
}

export default App;
