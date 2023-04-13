import styled from "styled-components";
import { BaseButton } from "../buttons/button.styles";

export const TextLineContainer = styled.section`
    height:100%;
    display:flex;
    flex-direction:column;
    
    p {
        margin:auto;
        text-align:center;
    }
`

export const TextTable = styled.section`
    height:190px;
    width:100%;
    display:flex;
    flex-direction:column;

    @media (max-height:425px) {
        height:25%;
    }
    
    p {
        font-weight:600;
    }
`

export const ButtonPanel = styled.section`
    position:absolute;
    display:flex;
    flex-direction:column;
    bottom:0px;
    justify-content:space-between;
    height:170px;
    width:100%;
`

export const StartButton = styled(BaseButton)`
    background-color:green;
    height:50px;
    color:white;
`

export const StopButton = styled(StartButton)`
    background-color:red;
`