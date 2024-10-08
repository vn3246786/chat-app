import { createContext, useReducer } from "react";
import { children,  chatContextInitial, chat } from "../../TypeDefinitions";
import { reducer } from "./ChatReducer";
import { useSessionStorage } from "../../Hooks/useSessionStorage";



const INITIALSTATE = {
    loading:false,
    data:useSessionStorage<chat>("chat",null),
    error:null
}



 export const chatContext = createContext<chatContextInitial>({
 handleData:()=>{},
 handleLoading:()=>{},
 handleError:()=>{},
  chatData:null,
  chatError:null,
  chatLoading:false
})

const ChatContextprovider = ({children}:children) => {
  const [state, dispatch] = useReducer(reducer, INITIALSTATE)


  return (
    <chatContext.Provider value={{
        handleData:(data)=>{dispatch({type:"success",payload:{newData:data,error:null}})},
        handleLoading:()=>{dispatch({type:"start",payload:{newData:null,error:null}})},
        handleError:(error)=>{dispatch({type:"failure",payload:{newData:null,error:error}})},
        chatData:state.data,
        chatLoading:state.loading,
        chatError:state.error
    }}>
      {children}
    </chatContext.Provider>
  )
}



export default ChatContextprovider