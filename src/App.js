import './App.css';
import { useState,useReducer,useEffect } from 'react';
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
    // currentSegment:0,
    delay:200, // Milliseconds
    stateText:readString,
    splitOption:' ', // View words or letters
    wordsPerSegment:3, // Number of words visible at a single time
    segments:[],
    // isPlaying:false
  })
  const {
    currentItem,
    delay,
    stateText,
    splitOption,
    wordsPerSegment,
    segments,
    // isPlaying
    // currentSegment,
    // timedArray,
  } = state
  // --- These array generators are for building and testing --- //
  // const M = Array.from(Array(20))
  // const timedArray = M.map((el,i) => el=i)
  // ----------------------------------------------------------- //

  useEffect(() => {segmentGenerator(stateText)},[])

  // const timedArray = stateText.split(splitOption)
  // const timedArraySegment = timedArray.map(el => el = el+wordsPerSegment)
  const segmentGenerator = (string) => {
    var array = string.split(splitOption)
    var slices = []
    for (var i=0; i<array.length; i+=wordsPerSegment) {
      slices.push(array.slice(i,i+wordsPerSegment).join(' '));
    }
    // console.log('hit segment generator',slices)
    setState({...state,segments:slices})
  }

  // --- For displaying single words or single letters --- //
  const filteredText = segments.filter((item,index) => index === currentItem)
  const mappedText = filteredText.map((el,i) => {return <h2 key={i}>{el}</h2>})
  // ---------------------------------------------------- //

  // --- For displaying multiple words --- //
  // const filteredSegments = segments.filter((item,index) => index === currentSegment)
  // const mappedWords = filteredSegments.map((el,i) => {return <h2 key={i}>{el}</h2>})
  // ------------------------------------- //

  const inputHandler = (e) => {
    const { name,value } = e.target
    console.log('input',name)
    setState({...state,[name]:value})
  }

  const pasteFromClipboard = (e) => {
    e.preventDefault()
      navigator.clipboard.readText()
      .then(text => {
        try {
          if (typeof(text) === 'string') {
            segmentGenerator(text)
          //   setState({
          //     ...state,
          //     stateText:text
          // })
        }
                
      } catch (error) {
          console.log(error)
      }
    })
      .catch(err => {
      console.log(err);
    });
  }

  const stopPlaying = (i) => {
    console.log('next item',i)
    
    clearTimeout(setTimeout(() => {
      
    }, i))
  }

  const delayControler = async () => {
    await dispatch({type:true})
    // setState({...state,isPlaying:true})
    await segments.forEach((el,i) => {
      
      (function (i) {
        setTimeout(function () {
        
          if (i === segments.length-1) {
            dispatch({type:false})
            // setState({...state,isPlaying:false})
          } else {
            // console.log('interval',i)
            setState({...state,currentItem:i})
            // nextItem(i)
          }
          
        }, delay * i);
      })(i);
    })
  }

  return (
    
    <div className="App">

      {/* <label>number of words</label>
      <input 
        style={{width:'50px'}}
        name="wordsPerSegment"
        type='number'
        value={wordsPerSegment}
        onChange={inputHandler}
      /> */}

      {/* <TextEditor inputHandler={inputHandler} text={stateText}/> */}
      <button onClick={(e) => pasteFromClipboard(e)}>paste text</button>
      <div style={{height:'25px',width:'50px',margin:'auto'}}>
        {isPlaying === false && 
        <button onClick={() => delayControler()}>
          start
        </button>}

        <button onClick={() => stopPlaying()}>stop</button>

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
