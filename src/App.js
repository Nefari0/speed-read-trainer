import './App.css';
import { useState } from 'react';

function App() {
  
  const [state,setState] = useState({
    currentItem:0,
    delay:200,
    arrayLength:20,
    isPlaying:true
  })
  const {
    currentItem,
    delay,
    arrayLength,
    isPlaying,
  } = state
  const M = Array.from(Array(arrayLength)) // rows
  const timedArray = M.map((el,i) => el=i)

  const filteredText = timedArray.filter(item => item === currentItem)

  const mappedText = filteredText.map((el,i) => {
      return <h2 key={i}>here is the element:{el}</h2>
    })

  const delayControler = () => {
    timedArray.forEach((el,i) => {
      (function (el) {
        setTimeout(function () {setState({...state,currentItem:i})}, delay * el);
      })(el);
    })
  }

  return (
    <div className="App">
      <button onClick={() => delayControler()}>{isPlaying ? 'stop' : 'start'}</button>
      {mappedText}
    </div>
  );
}

export default App;
