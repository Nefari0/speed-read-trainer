import { useEffect,useReducer, useState } from "react";

const initialState = {
    slice:0,
    segments:[],
    isPlaying:false,
  }

function reducer(state, action) {
    switch (action.type) {
        case 'start':
            return {...initialState,slice:action.slice,isPlaying:action.playing}
        case 'count':
            return {...initialState,slice:action.slice}
        case 'stop':
            return {...initialState,isPlaying:false}
      default:
        throw new Error();
    }
  }

const TextLine = ({elements,state,setState}) => {

    const { delay,chunkIndex } = state


    const [reducerState, dispatch] = useReducer(reducer, initialState);
    const { slice } = reducerState

    const [isPlaying,setIsPlaying] = useState(false)

    const filteredElements = elements.filter((el,i) => i === slice)
    const mappedElements = filteredElements.map((el,i) => {
        return <p key={i}>{el}</p>
    })

    useEffect(() => {timer()},[elements,isPlaying])

    const timer = () => {

        if (isPlaying) {
            elements.forEach((el,index) => {
                setTimeout(function () {
                    dispatch({type:'count',slice:slice+index})
                }, delay * index);
            })
        }
    }

    const readActionHander = (i) => {
        if (chunkIndex + i >= 0 && chunkIndex + i < state.chunks.length) {
            setIsPlaying(true)
            dispatch({type:'start',slice:0})
            setState({...state,chunkIndex:state.chunkIndex+i})
        }
        setTimeout(function() {
            setIsPlaying(false)
        }, delay * elements.length);
    
    }
    
    return (
        <div>
            {mappedElements}

            {!isPlaying &&
            <div style={{display:'flex',width:'100vw'}}>
                <button
                    onClick={() => readActionHander(-1)}
                    style={{margin:'auto'}}>
                    prev
                </button>
            
                <button
                    onClick={() => readActionHander(1)}
                    style={{margin:'auto'}}
                >
                    next
                </button>
            </div>}
        </div>
    )
}

export default TextLine