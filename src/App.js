import './App.css';
import { useState,useReducer } from 'react';
import { readString, readString2 } from './textString';

const initialState = {isPlaying:false}
function reducer(state, action) {
  switch (action.type) {
    case true:
      return {isPlaying:true};
    case false:
      return {isPlaying:false};
    default:
      throw new Error();
  }
}

function App() {
  const [reducerState, dispatch] = useReducer(reducer, initialState);
  const { isPlaying } = reducerState
  
  const [state,setState] = useState({
    currentItem:0,
    delay:200, // Milliseconds
  })
  const {
    currentItem,
    delay,
  } = state
  // --- These array generators are for building and testing --- //
  // const M = Array.from(Array(20))
  // const timedArray = M.map((el,i) => el=i)
  // ----------------------------------------------------------- //

  const timedArray = readString.split('')
  const filteredText = timedArray.filter((item,index) => index === currentItem)
  const mappedText = filteredText.map((el,i) => {return <h2 key={i}>{el}</h2>})

  const delayControler = async () => {
    dispatch({type:true})
    timedArray.forEach((el,i) => {
      
      (function (i) {
        setTimeout(function () {
          if (i === timedArray.length-1) {
            dispatch({type:false})
          } else {
            setState({...state,currentItem:i})
          }
        }, delay * i);
      })(i);
    })
  }

  return (
    
    <div className="App">
      <div style={{height:'25px',width:'50px',margin:'auto'}}>
        {isPlaying === false && 
        <button onClick={() => delayControler()}>
          start
        </button>}
      </div>
      {/* <button onClick={() => dispatch({type: !isPlaying})}>start2</button> */}
      {mappedText}
    </div>
  );
}

export default App;
