import Messages from "../Components/Messages"
import ChatNavbar from "../Components/ChatNavbar"
import TypeMessage from "../Components/TypeMessage"
import { useLocation } from "react-router-dom"
import { useContext, useEffect } from "react"
import { chatContext } from "../Contexts/ChatContext/ChatContext"
import { joinRoom } from "../Contexts/UserContext/apiCalls"
import { updateUnseenMessageCount } from "../Contexts/ChatContext/apiCalls"
import { userContext } from "../Contexts/UserContext/UserContext"

const ChatPage = () => {

interface state{
  id:string,
  name:string
}

const {state}:{state:state} = useLocation()
const {chatData}=useContext(chatContext)
const {userData}=useContext(userContext)

useEffect(()=>{
joinRoom(state.id,"Reciever")
},[])


useEffect(()=>{
userData&&  updateUnseenMessageCount(userData._id,state.id)
},[chatData])

  return (
    <div>
      <ChatNavbar name={state.name}/>
      {chatData&&chatData.map((value,i)=>{
        if(value.id===state.id){
          return <Messages key={i} data={value.messages?value.messages:[]}/>
        }else return
      })}
      <TypeMessage chatId={state.id} />
    </div>
  )
}

export default ChatPage
