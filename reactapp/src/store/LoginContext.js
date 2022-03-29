import { createContext } from 'react';
const LoginContext=createContext({

    isAuthendicated:false,
    userData:[],
    login:()=>{},
    logout:()=>{},
})

export default LoginContext;
