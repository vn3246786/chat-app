import { useContext, useEffect } from "react"
import ChatCollection from "../Components/ChatCollection"
import MainNavbar from "../Components/MainNavbar"
import { chatContext } from "../Contexts/ChatContext/ChatContext"
import { userContext } from "../Contexts/UserContext/UserContext"
import { getChats } from "../Contexts/ChatContext/apiCalls"
import { joinRoom } from "../Contexts/UserContext/apiCalls"
import { socket } from "../App"


const Home = () => {

  const {chatData,handleData,handleError,handleLoading}=useContext(chatContext)
  const {userData}=useContext(userContext)

  useEffect(()=>{
    userData && getChats(userData._id,{handleData,handleLoading,handleError})
    socket.emit("leave all")
      userData && joinRoom(userData._id,"sender")
  },[])

  return (
    <div className="bg-gray-300">
     <MainNavbar/>
     <ChatCollection data={chatData}/>
    </div>
  )
}

export default Home
