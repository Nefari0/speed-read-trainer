import styled from "styled-components";
import { BaseButton } from "../buttons/button.styles";

export const ErrorContainer = styled.section`
    position:relative;
    margin:auto;
    width:500px;
    min-height:200px;
    background-color:#fff;
    box-shadow:10px 5px 60px 10px rgba(36, 36, 36, 1);
    border-radius:8px;
    text-align:center;
    display:flex;
    justify-content:center;
    align-items:center;

    @media (max-width:500px) {
        width:94vw;
    }
`

const buttonWidth = 90
const buttonMargin = (100%buttonWidth)/2
export const CloseError = styled(BaseButton)`
    position:absolute;
    bottom:8px;
    left:0;
    height:35px;
    width:${buttonWidth}%;
    margin-left:${buttonMargin}%;

`