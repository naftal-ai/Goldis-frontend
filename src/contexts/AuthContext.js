import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const token = localStorage.getItem("jwtToken");
    
    const isValidToken = (token) => {
         const {exp} = JSON.parse(atob(token.split('.')[1]));
         return exp > Date.now() / 1000; 
             
    }
    useEffect(() => {
        if (token && isValidToken(token)) {
            setIsLoggedIn(true);
        }
      }, []);



    return (
       <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, isValidToken}}>
        {children}
       </AuthContext.Provider>
    )
}
