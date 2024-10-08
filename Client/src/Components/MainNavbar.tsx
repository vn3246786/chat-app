import { ArrowBack } from "@mui/icons-material"
import { toast } from "react-toastify"
import LogOut from "./LogOut"

const MainNavbar = () => {


function logOut(){
toast(<LogOut/>,{
  position: "top-center",
  autoClose: false,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light"})
}

  return (
    <div className="flex bg-green-400 pl-3 gap-5 py-3">
      <div onClick={()=>logOut()}>
      <ArrowBack/>
      </div>
      <h1>My Chats</h1>
      
    </div>
  )
}

export default MainNavbar
