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
        height:98vh;
    }
`

export const OverLay = styled.section`
    width:500px;
    position:absolute;
    height:350px;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:1;

    @media (max-width:500px) {
        width:98vw;
    }

    @media (max-height:650px) {
        height:98vh;
    }
`