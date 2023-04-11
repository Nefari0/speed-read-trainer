import './App.css';
import { useState,useReducer,useEffect } from 'react';
import { readString, readString2 } from './textString';

const initialState = {
  chunkIndex:0,
  segments:[],
  isPlaying:false,
}
function reducer(state, action) {
  switch (action.type) {
    case 'index+':
      var newVal = state.chunkIndex+=1
      return {...initialState,chunkIndex:newVal};
    case 'index-':
      var newVal = state.chunkIndex-=1
      return {...initialState,chunkIndex:newVal};
    case 'update':
      return {...initialState,segments:action.payload}
    case 'start':
      return {...initialState,isPlaying:action.payload}
    default:
      throw new Error();
  }
}

function App() {
  const [reducerState, dispatch] = useReducer(reducer, initialState);
  const { segments } = reducerState
  
  const [state,setState] = useState({
    currentItem:0, // Segment index currently displayed
    delay:600, // Milliseconds
    stateText:readString,
    splitOption:' ', // View words or letters
    wordsPerSegment:3, // Number of words visible at a single time
    chunkSize:5, // Determining how many slice elements are pushed to array.
    chunks:[],
    chunkIndex:0,
  })
  const {
    currentItem,
    delay,
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

  // --- For displaying multiple words --- //
  const filteredSegments = segments.filter((item,index) => index === currentItem)
  const mappedWords = filteredSegments.map((el,i) => {return <h2 key={i}>{el}</h2>})

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

  const startPlaying = () => {
    
    segments.forEach((el,index) => {
      setTimeout(function () {
          var updateIndexValue = () => {
            return (index === chunkSize ? 0 : index)
          }
          setState({
            ...state,
            currentItem:updateIndexValue(),
            chunkIndex:chunkIndex+(chunkSize/chunkSize),
          })        
      }, delay * index);
    })
    if (chunkIndex <= chunks.length-2) {dispatch({type:'update',payload:chunks[chunkIndex+1],isPlaying:false})}
  }

  const sectionManager = (param) => {
    switch (param) {
      case 'play':
        return startPlaying()
      case 'prev':
        dispatch({type:'update',payload:chunks[chunkIndex-1]})
        setState({
          ...state,
          currentItem:0,
          chunkIndex:chunkIndex-1
        })
        return
    }
  }

  return (
    
    <div className="App">

      <button onClick={(e) => pasteFromClipboard(e)}>paste text</button>
      <div style={{height:'25px',width:'50px',margin:'auto'}}>

        {chunkIndex < 1 ?
          <button onClick={() => sectionManager('play')}>
            start
          </button>
          :
          <div style={{display:'flex'}}>
            <button onClick={() => sectionManager('prev')}>previous</button>
            <button onClick={() => sectionManager('play')}>next</button>
          </div>
        }

      </div>
      {mappedWords}
    </div>
  );
}

export default App;
