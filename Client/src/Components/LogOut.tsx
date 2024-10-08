import { useContext } from "react"
import { userContext } from "../Contexts/UserContext/UserContext"
import { socket } from "../App"

const LogOut = () => {

const {logOut,userData}=useContext(userContext)

function handleLogOut(type:Boolean){
    if(type){
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("chat")
        socket.emit("leave room",userData?._id)
       socket.disconnect()
        logOut()
    }else return
}

  return (
    <div>
      <div className="ml-16 text-black">Do you want to logout</div>
      <div className="flex justify-around mt-5">
        <button onClick={()=>handleLogOut(true)} className="bg-red-600 text-white px-[20px] py-[5px]">Yes</button>
        <button onClick={()=>handleLogOut(false)} className="bg-blue-600 text-white px-[20px] py-[5px]">No</button>
      </div>
    </div>
  )
}

export default LogOut
