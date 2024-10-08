import { createContext, useReducer } from "react";
import { userContextInitial,children,UserData } from "../../TypeDefinitions";
import { reducer } from "./UserReducer";
import { useSessionStorage } from "../../Hooks/useSessionStorage";



const INITIALSTATE = {
    loading:false,
    data:useSessionStorage<UserData>("user",null),
    error:null
}



 export const userContext = createContext<userContextInitial>({
 handleData:()=>{},
 handleLoading:()=>{},
 handleError:()=>{},
 logOut:()=>{},
  userData:null,
  userError:null,
  userLoading:false
})

const UserContextprovider = ({children}:children) => {
  const [state, dispatch] = useReducer(reducer, INITIALSTATE)


  return (
    <userContext.Provider value={{
        handleData:(data)=>{dispatch({type:"success",payload:{data:data,error:null}})},
        handleLoading:()=>{dispatch({type:"start",payload:{data:null,error:null}})},
        handleError:(error)=>{dispatch({type:"failure",payload:{data:null,error:error}})},
        logOut:()=>{dispatch({type:"logout",payload:{data:null,error:null}})},
        userData:state.data,
        userLoading:state.loading,
        userError:state.error
    }}>
      {children}
    </userContext.Provider>
  )
}



export default UserContextprovider
