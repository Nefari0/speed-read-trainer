import './App.css';
import { useState,useReducer } from 'react';
import { readString, readString2 } from './textString';
import TextEditor from './lib/TextBox/text-box.component';

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
    stateText:readString,
    splitOption:' '
  })
  const {
    currentItem,
    delay,
    stateText,
    splitOption
  } = state
  // --- These array generators are for building and testing --- //
  // const M = Array.from(Array(20))
  // const timedArray = M.map((el,i) => el=i)
  // ----------------------------------------------------------- //

  const timedArray = stateText.split(splitOption)
  // if (numOfCharacters === '' || numOfCharacters === ' ') {

  // }
  const filteredText = timedArray.filter((item,index) => index === currentItem)
  const mappedText = filteredText.map((el,i) => {return <h2 key={i}>{el}</h2>})

  // const inputHandler = (e) => {
  //   const { name,value } = e.target
  //   setState({...state,[name]:value})
  // }

  const pasteFromClipboard = (e) => {
    e.preventDefault()
      navigator.clipboard.readText()
      .then(text => {
        try {
          if (typeof(text) === 'string') {
            setState({
              ...state,
              stateText:text
          })  
        }
                
      } catch (error) {
          console.log(error)
      }
    })
      .catch(err => {
      console.log(err);
    });
  }

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

      <select
        name="displaySource"
        onChange={e => {
          setState({...state, splitOption: e.target.value})
        }}
      >
        <option value=" ">word</option>
        <option value="">letter</option>
      </select>

      {/* <TextEditor inputHandler={inputHandler} text={stateText}/> */}
      <button onClick={(e) => pasteFromClipboard(e)}>paste text</button>
      <div style={{height:'25px',width:'50px',margin:'auto'}}>
        {isPlaying === false && 
        <button onClick={() => delayControler()}>
          start
        </button>}

        {/* <button onClick={() => dispatch({type:false})}>
          pause
        </button> */}

      </div>
      {/* <button onClick={() => dispatch({type: !isPlaying})}>start2</button> */}
      {mappedText}
    </div>
  );
}

export default App;
