import { Add, Close } from "@mui/icons-material"
import { chat } from "../TypeDefinitions"
import Chat from "./Chat"
import { useContext, useState } from "react"
import { addChat } from "../Contexts/ChatContext/apiCalls"
import { userContext } from "../Contexts/UserContext/UserContext"
import { chatContext } from "../Contexts/ChatContext/ChatContext"
import { toast } from "react-toastify"
import { CircularProgress } from "@mui/material"

const ChatCollection = ({data}:{data:chat}) => {

const[newChatModel,setNewChatModel]=useState<Boolean>(false)
const {userData}=useContext(userContext)
const {handleData,handleError,handleLoading,chatLoading}=useContext(chatContext)

const [roomId,setRoomId]=useState<string>("")

function add():void{
  if(roomId){
    userData&&addChat(userData._id,roomId,{handleData,handleError,handleLoading})  
  }else toast.warning("id field is empty")
}


  return (
    <div className="min-h-[93vh] bg-gray-300 pt-3 relative">
      {chatLoading&&<CircularProgress size={70} className="absolute top-0 bottom-0 left-0 right-0 mt-auto mb-auto mr-auto ml-auto z-[200]"/>}
      <div className="flex gap-2 w-32 bg-white ml-3 mb-3 rounded-lg p-2 cursor-pointer" onClick={()=>setNewChatModel(true)}>
      <Add/>
      <button className="">New Chat</button>
      </div>
     {newChatModel&& <div className="absolute left-0 right-0 bottom-0 top-0 mx-auto my-auto h-56 font-bold w-96 bg-white p-7 rounded-lg z-[100]">
        <div onClick={()=>setNewChatModel(false)} className="cursor-pointer">
        <Close className="absolute right-[9px] top-[7px]"/>
        </div>
        <div className="mb-2 mt-2 text-[2rem]">ENTER ROOM ID</div>
        <input type="text" className="bg-gray-300 border-2 border-black mb-2 p-2 w-[20rem]" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setRoomId(e.target.value)}/>
        <button className="block ml-[110px] bg-green-400 px-4 py-2 rounded-lg mt-2"onClick={()=>add()} >START CHAT</button>
      </div>}
     {data&&data.map((value,i)=>{
    return <Chat key={i} value={value}/>
     }) }
    </div>
  )
}

export default ChatCollection
