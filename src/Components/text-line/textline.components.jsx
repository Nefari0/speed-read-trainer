import { useEffect,useReducer } from "react";

const initialState = {
    slice:0,
    segments:[],
    isPlaying:false,
  }

function reducer(state, action) {
    switch (action.type) {
        case 'count':
            return {...initialState,slice:action.payload}
        case 'start':
            return {...initialState,isPlaying:true}
      default:
        throw new Error();
    }
  }

const TextLine = ({elements,state,setState}) => {

    const { delay,chunkIndex } = state


    const [reducerState, dispatch] = useReducer(reducer, initialState);
    const { slice,isPlaying } = reducerState

    const filteredElements = elements.filter((el,i) => i === slice)
    const mappedElements = filteredElements.map((el,i) => {
        return <p key={i}>{el}</p>
    })

    useEffect(() => {timer()},[elements])

    const timer = () => {

        if (isPlaying) {
            elements.forEach((el,index) => {
                setTimeout(function () {
                    dispatch({type:'count',payload:slice+index})
                }, delay * index);
            })
        }
    }

    const readActionHander = (i) => {
        if (chunkIndex + i >= 0 && chunkIndex + i < state.chunks.length) {
            dispatch({type:'count',payload:0})
            setState({...state,chunkIndex:state.chunkIndex+i})
        }
    
    }
    
    return (
        <div>
            {mappedElements}
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
        </div>
        </div>
    )
}

export default TextLine