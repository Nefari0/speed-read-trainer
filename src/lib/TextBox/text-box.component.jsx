import { MainTextField } from "./text-box.styles"

const TextEditor = ({text,inputHandler}) => {

    return (
        <MainTextField
            type="text" 
            name="stateText"
            onChange={inputHandler}
            value={text}
        />
    )
}

export default TextEditor