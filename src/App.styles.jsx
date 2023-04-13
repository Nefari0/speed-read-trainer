import styled from "styled-components";

export const AppConainer = styled.main`
    width:500px;
    position:relative;
    height:350px;
    margin:auto;
    display:flex;
    flex-direction:column;

    @media (max-width:500px) {
        width:98vw;
    }

    @media (max-height:650px) {
        hwight:98vh;
    }
`