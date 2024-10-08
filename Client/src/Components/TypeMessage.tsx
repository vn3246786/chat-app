import { Send } from "@mui/icons-material"
import { socket } from "../App"
import { useContext, useState } from "react"
import { userContext } from "../Contexts/UserContext/UserContext"
import { newMessage } from "../TypeDefinitions"
import { chatContext } from "../Contexts/ChatContext/ChatContext"

const TypeMessage = ({chatId}:{chatId:string}) => {

const [message,setMessage]=useState<string>("")
const {userData}=useContext(userContext)
const {chatData,handleData}=useContext(chatContext)


function sendMessage(){
  if(userData&&chatData&&message!==""){
    const msg:newMessage = {senderId:userData._id,id:chatId,message:message,name:userData.username}
    const updatemsg = chatData.map((value)=>{
if(value.id===chatId){
  return {...value,messages:[...value.messages,{message:message,type:"sent"}]}
}else return value
    })
    handleData(updatemsg)
    setMessage("")
    socket.emit("send",msg)
  }else return
}

  return (
    <div className="flex bg-gray-500 fixed bottom-[0] w-[100%] py-1 justify-center">
    <input type="text" value={message} className="border-black border-[1px] p-2 rounded-lg w-[400px]" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setMessage(e.target.value)}/>
    <button className="bg-green-500 px-[10px]" onClick={()=>sendMessage()}><Send sx={{color:"white"}}/></button>
          </div>
  )
}

export default TypeMessage
