import { SpeedSettingPanel } from "./speed-panel.component.styles";
import { SpeedChangeButton } from "./speed-panel.component.styles";

const SpeedPanel = ({state,setState}) => {

    const speeds = [600,500,400,300,200,100]

    const speedButtons = speeds.map((element,index) => {
        return (
            <SpeedChangeButton 
                key={index}
                state={state}
                value={element}
                onClick={() => setState({...state,delay:element})}
            >
                {element}ms
            </SpeedChangeButton>
        )
    })

    return (
        <SpeedSettingPanel>
            {speedButtons}
            {/* <h2>speed setting</h2> */}
            {/* <SpeedChangeButton state={state}>button</SpeedChangeButton>
            <SpeedChangeButton>button</SpeedChangeButton>
            <SpeedChangeButton>button</SpeedChangeButton>
            <SpeedChangeButton>button</SpeedChangeButton> */}
        </SpeedSettingPanel>
    )
}

export default SpeedPanel