import React, { useState } from "react";
import LoginContext from "./LoginContext";

const LoginContextProvider=(props)=>{
    const [isAuthendicated,setIsAuthendicated]=useState(false);
    const [userData,setUserData]=useState([]);
    const Login=(data)=>{
        setIsAuthendicated(true);
        setUserData(data);
    }
    const Logout=()=>{
        setIsAuthendicated(false);
        setUserData({});
    }

    return<LoginContext.Provider value={{
       
        isAuthendicated:isAuthendicated,
        userData:userData,
        login:Login,
        logout:Logout,
    }}>
        {props.children}
    </LoginContext.Provider>
}
export default LoginContextProvider;