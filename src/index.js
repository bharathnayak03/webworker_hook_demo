import React, { useState } from "react";
import ReactDOM from "react-dom";
import useInterval from "react-useinterval";

import "./styles.css";

const fib = n => (n < 2 ? n : fib(n - 1) + fib(n - 2));

function App() {
  const [count, setCount] = useState(0);
  let [timer, setTimer] = useState(0);
  const data = fib(count);

  useInterval(() => {
    setTimer(timer + 1);
  }, 1000 / 60);

  function generateFib() {
    setCount(count + 1);
  }

  return (
    <div className="App">
      currentNumber: {count}
      <br />
      fibonacci: {data}
      <br />
      <button onClick={generateFib}>Generate</button>
      <h1>{timer}</h1>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
