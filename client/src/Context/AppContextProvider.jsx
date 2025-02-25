import { createContext, useEffect, useState } from "react"

export const AppContext=createContext()
const AppContextProvider = ({children}) => {
  const[user,setUser]=useState(null);
  const[isadmin,setIsAdmin]=useState(false);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
   setUser(JSON.parse(localStorage.getItem("user")));
   setIsAdmin(()=>{const userexist=JSON.parse(localStorage.getItem("user"));const role=userexist?.role;
    if(role==="admin"){
      return true;
    }else{
      return false;
    }
   })
  },[])
  return (
 < AppContext.Provider value={{loading,setLoading,user,setUser,isadmin,setIsAdmin}}>
 {children}
 </AppContext.Provider>
  )
}

export default AppContextProvider
