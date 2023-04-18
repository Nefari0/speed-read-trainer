import styled, {css} from "styled-components"
import { SmallButton } from "../buttons/button.styles"

export const SpeedSettingPanel = styled.div`
    width:100%;
    height:60px;
    display:flex;
`

const buttonShrink = css`
    box-shadow: inset 0 0 5px #555;
    transform: scale(.9);
    transition: all 500ms;
`

export const SpeedChangeButton = styled(SmallButton)`
    transition: all 500ms;
    border-radius:8px;
    width:75px;

    ${({state,value}) => state.delay === value && buttonShrink}

    &:hover {${buttonShrink}}

    @media (max-width:360px) {
        width:40px;
        height:40px;
        font-size:8px;
    }
`
