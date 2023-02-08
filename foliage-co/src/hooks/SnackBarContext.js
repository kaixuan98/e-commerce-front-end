import React, {useState} from "react";

const SnackbarContext = React.createContext({
    isDisplayed: false,
    displayMsg: (msg) => {},
    displayIcon: (icon) => {},
    onClose: () => {}
});
 
let timer; 

export const SnackbarContextProvider = (props) => {
    const [msg, setMsg] = useState("");
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [type, setType] = useState("Success");

    const displayHandler = (msg,type) => {
        setMsg(msg);
        setType(type); 
        setIsDisplayed(true);
        timer = setTimeout( () => {
            closeHandler()
        }, 3000);
    };

    const closeHandler = () => {
        clearTimeout(timer);
        setIsDisplayed(false);
    };

    return(
        <SnackbarContext.Provider
            value={{
                msg,
                isDisplayed,
                type,
                displayMsg: displayHandler,
                onClose: closeHandler
            }}    
        >
            {props.children}
        </SnackbarContext.Provider>
    )
}

export default SnackbarContext;