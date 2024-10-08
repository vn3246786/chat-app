import {BrowserRouter as Router,Route,Routes, Navigate,  } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from "react"
import { userContext } from "./Contexts/UserContext/UserContext"
import ChatPage from "./Pages/ChatPage"
import {io}from "socket.io-client"
import { chatContext } from "./Contexts/ChatContext/ChatContext"
import { chat, newMessage } from "./TypeDefinitions"
import Test from "./Test"


export const socket = io(import.meta.env.VITE_SERVER_URL,{autoConnect:false})
function App() {
const {userData}=useContext(userContext)
  const{chatData,handleData}=useContext(chatContext)

  function updateMessages(chatData:chat|null,message:newMessage):chat{
        let arr:chat=[]
        let index:number|null=null
     
        arr =chatData?chatData.filter((data,i)=>{
          if(data.id===message.senderId){
            index=i
          }
          return data.id!==message.senderId
        }):[]

        function getunseen():number{
          let num:number=1
          chatData?.forEach((data)=>{
          if(data.id===message.senderId){
            num= data.unseen+1
              }else num
          })
      return num
        }
        const msgArray =typeof index==="number"&&chatData?[...chatData[index].messages,{message:message.message,type:"received"}]:[{message:message.message,type:"received"}]
         arr.push({name:message.name,id:message.senderId,unseen:getunseen(),messages:msgArray})
         arr.reverse()
         return arr   
  }




function receiveMessage(value:newMessage){
  if(chatData&&chatData.length<1){
   handleData([{id:value.senderId,unseen:1,messages:[{message:value.message,type:"received"}],name:value.name}])
  }else {
     handleData(updateMessages(chatData,value))
  }
}

useEffect(()=>{
   socket.on("receive",(value:newMessage)=>{
  receiveMessage(value)
})

},[socket,chatData])

  return (
   <>
   <ToastContainer/>
   <Router>
    <Routes>
      <Route path="/" element={userData?<Home/>:<Navigate to={"/login"} />} />
      <Route path="/login" element={!userData?<Login/>:<Navigate to={"/"}/>} />
      <Route path="/register" element={!userData?<Register/>:<Navigate to={"/"}/>} />
      <Route path="/messages/:id" element={<ChatPage/>} />
      <Route path="/test" element={<Test/>} />
    </Routes>
   </Router>
   </>
  )
}

export default App
