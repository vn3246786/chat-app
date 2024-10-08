import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login } from "../Contexts/UserContext/apiCalls"
import { userContext } from "../Contexts/UserContext/UserContext"
import { CircularProgress } from "@mui/material"

const Login = () => {

  const navigate=useNavigate()
const [visibility, setVisibility]=useState<Boolean>(false)

const {handleData,handleLoading,handleError,userLoading}=useContext(userContext)

const [email,setEmail] = useState<string>("")
const [password,setPassword] = useState<string>("")

function handleSubmit (e: React.FormEvent<HTMLFormElement>){
  e.preventDefault()
  if(email===""){
    toast.error("email is required")
  }else if (password===""){
    toast.error("password is required")
  }else login({email:email,password:password},{handleData,handleLoading,handleError})
  }
  
  return (
    <form onSubmit={handleSubmit} className="h-[100vh] bg-slate-600 flex justify-center items-center">
     {userLoading&& <CircularProgress sx={{color:"blue"}} className="absolute top-auto bottom-auto left-auto right-auto z-[100]" size={70}/>}
<div className="h-[350px] w-[300px] bg-white rounded-3xl p-[20px] relative">
<h1 className="ml-[92px] mt-[20px] text-[2rem] font-bold">Login</h1>
<input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="bg-blue-400 border-2 border-black rounded-lg mt-[20px] p-[10px] w-[257px] placeholder-black"/>
<input type={visibility?"text":"password"} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="bg-blue-400 border-2 border-black rounded-lg mt-[20px] p-[10px] w-[257px]  placeholder-black"/>
<div className="absolute bottom-[136px] right-[28px]">
{visibility?<Visibility onClick={()=>setVisibility(false)}/>:<VisibilityOff onClick={()=>setVisibility(true)}/>}
</div>
<button type="submit" className="bg-gray-600 text-white px-[20px] py-[5px] rounded-md mt-[20px] ml-[91px]">login</button>
<div className="mt-[20px] ml-[20px] flex">
  <div>Create new account?</div>
<div className="inline text-blue-700 cursor-pointer" onClick={()=>navigate("/register")}>Register</div>
</div>
</div>
    </form>
  )
}

export default Login
