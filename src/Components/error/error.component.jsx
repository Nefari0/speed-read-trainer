import { ErrorContainer,CloseError } from "./error.styles";
import { OverLay } from "../../App.styles";

const Error = ({state,setState}) => {
    return (
        <OverLay>
            <ErrorContainer>
                <p>
                {state.error}
                </p>
                <CloseError onClick={() => setState({...state,error:null})}>Close</CloseError>
            </ErrorContainer>
        </OverLay>
    )
}

export default Error