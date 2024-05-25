import React, { createContext, useState } from 'react'

export const LoginContext = createContext(null)

export const LoginContextProvider = ({ children }) => {


    const [authorize, setAuthorize] = useState(false)

    const handleAuth = () =>{
        setAuthorize(true)
    }

    const contextValue = {authorize,handleAuth}
    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    )
}
