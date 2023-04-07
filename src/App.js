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
    stateText:readString
  })
  const {
    currentItem,
    delay,
    stateText
  } = state
  // --- These array generators are for building and testing --- //
  // const M = Array.from(Array(20))
  // const timedArray = M.map((el,i) => el=i)
  // ----------------------------------------------------------- //

  const timedArray = stateText.split(' ')
  const filteredText = timedArray.filter((item,index) => index === currentItem)
  const mappedText = filteredText.map((el,i) => {return <h2 key={i}>{el}</h2>})

  const inputHandler = (e) => {
    const { name,value } = e.target
    console.log('hit input handler',name)
    setState({...state,[name]:value})
  }

  const pasteFromClipboard = (e) => {
        e.preventDefault()
        // try {
          
          navigator.clipboard.readText()
          .then(text => {
            // --- verify that copied items are integers or floats in string format --- //
            try {
              if (typeof(text) === 'string') {
                        console.log('hit copy function',typeof text)
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
                    console.log(null);
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
      {/* <TextEditor inputHandler={inputHandler} text={stateText}/> */}
      <button onClick={(e) => pasteFromClipboard(e)}>paste text</button>
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
