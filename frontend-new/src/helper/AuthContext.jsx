import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';


const AuthContext  = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(() => Cookies.get("user") || "Guest");
  const [error, setError] = useState();
    // useEffect(() => {
    //   if (user) {
       
    //   } else {
    //     Cookies.remove('user')
    //   }
    // }, [user])
    const login = async (credentials) => {
        try {
          const response = await axios.post('http://localhost:3000/auth/login', credentials);
          console.log(response);
    
          if (response.status === 200) {
            setUser(response?.data?.id?.id)
            Cookies.set('user', response?.data?.id?.id, {expires: 1})
          } else {
            alert("Login failed. Please check your credentials.");
          }
        } catch (error) {
          console.error("Login error: ", error);
          setError(error)
        }
      };

      const logout = () => {
        setUser("Guest"); // Clear user data
      };

  return (
   <AuthContext.Provider value={{user,login,error, logout}}>
    {children}
   </AuthContext.Provider>
  )
}


