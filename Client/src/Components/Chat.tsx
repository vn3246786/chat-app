import { useNavigate } from "react-router-dom"
import { chatObject } from "../TypeDefinitions"
import { AccountCircle } from "@mui/icons-material"

const Chat = ({value}:{value:chatObject}) => {

    const navigate = useNavigate()
  
  return (
    <div className="bg-white flex gap-3  px-5 py-3 border-[1px] border-black items-center" onClick={()=>navigate(`/messages/${value.id}`,{state:{id:value.id,
      name:value.name
    }})}>
      <AccountCircle className="text-gray-500" sx={{fontSize:"3rem"}} />
        <div>
            <div className="text-3xl/10">{value.name}</div>
            {value.messages&&value.messages.length>0&&<div  className="text-gray-500">{value.messages[value.messages.length-1].message.slice(0,90)+"..."}</div>}
        </div>
       {value.unseen>0&&<div className="bg-green-400 h-[40px] w-[40px] ml-auto flex justify-center items-center rounded-full">{value.unseen}</div>}
      </div>
  )
}

export default Chat
