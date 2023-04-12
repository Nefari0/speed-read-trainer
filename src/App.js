import './App.css';
import { useState,useReducer,useEffect } from 'react';
import { readString, readString2 } from './textString';

import TextLine from './Components/text-line/textline.components';

const initialState = {
  chunkIndex:0,
  segments:[],
  isPlaying:false,
}
function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {...initialState,segments:action.payload}
    default:
      throw new Error();
  }
}

function App() {
  const [reducerState, dispatch] = useReducer(reducer, initialState);
  
  const [state,setState] = useState({
    currentItem:0, // Segment index currently displayed
    delay:600, // Milliseconds
    stateText:readString,
    splitOption:' ', // View words or letters
    wordsPerSegment:3, // Number of words visible at a single time
    chunkSize:5, // Determining how many slice elements are pushed to array.
    chunks:null,
    chunkIndex:0,
  })
  const {
    stateText,
    splitOption,
    wordsPerSegment,
    chunkSize,
    chunks,
    chunkIndex,
  } = state

  useEffect(() => {segmentGenerator(stateText)},[])

  const segmentGenerator = (string) => {
    var array = string.split(splitOption)
    var chunks = []
    // --- Number of words displayed at in one instant
    var slices = []
    var iteration = 0

    if (array.length > 10) {
      for (var i=0; i<array.length; i+=wordsPerSegment) {
        slices.push(array.slice(i,i+wordsPerSegment).join(' '));
        iteration += 1
        if (iteration === chunkSize) {
          chunks.push(slices)
          slices = []
          iteration = 0
        }
        dispatch({type:'update',payload:chunks[0]})
        setState({
          ...state,
          chunks:chunks,
        })
      }
    }
  }

  const pasteFromClipboard = (e) => {
    e.preventDefault()
      navigator.clipboard.readText()
      .then(text => {
        try {
          if (typeof(text) === 'string') {segmentGenerator(text)}
      } catch (error) {
          console.log(error)
      }
    })
      .catch(err => {
      console.log(err);
    });
  }

  return (
    
    <div className="App">

      <button onClick={(e) => pasteFromClipboard(e)}>paste text</button>

      {chunks &&
        
        <TextLine
          elements={chunks[chunkIndex]}
          state={state}
          setState={setState}
        />
      }
      
    </div>
  );
}

export default App;
