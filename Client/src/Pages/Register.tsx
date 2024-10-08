import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useContext,useState } from "react"
import { register } from "../Contexts/UserContext/apiCalls"
import { toast } from "react-toastify"
import { userContext } from "../Contexts/UserContext/UserContext"
import { useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"

const Register = () => {

  const navigate=useNavigate()
const {handleData,handleLoading,handleError,userLoading}=useContext(userContext)

const [username,setUsername] = useState<string>("")
const [email,setEmail] = useState<string>("")
const [password,setPassword] = useState<string>("")
const [confirmPassword,setConfirmPassword] = useState<string>("")


const [visibility1, setVisibility1]=useState<Boolean>(false)
const [visibility2, setVisibility2]=useState<Boolean>(false)

function handlesubmit (e: React.FormEvent<HTMLFormElement>){
e.preventDefault()
if(username===""){
  toast.error("username is required")
}else if (email===""){
  toast.error("email is required")
}else if(password===""){
  toast.error("password is required")
}else if(confirmPassword===""){
  toast.error("please confirm password")
}else if(password===confirmPassword){
  register({username:username,email:email,password:password},{handleData,handleLoading,handleError})
}else toast.error("passwords do not match")
}

  return (
    <form onSubmit={handlesubmit} className="h-[100vh] bg-slate-600 flex justify-center items-center ">
       {userLoading&& <CircularProgress sx={{color:"blue"}} className="absolute top-auto bottom-auto left-auto right-auto z-[100]" size={70}/>}
<div className="h-[550px] w-[350px] bg-white rounded-3xl p-[20px] flex-col">
<h1 className="ml-[92px] mt-[20px] text-[2rem] font-bold mb-12">Register</h1>
<input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}  className="bg-blue-400 border-2 border-black rounded-lg mt-[20px] p-[10px] w-[307px] placeholder-black"/>
<input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="bg-blue-400 border-2 border-black rounded-lg mt-[20px] p-[10px] w-[307px] placeholder-black"/>
<div className="relative">
<input type={visibility1?"text":"password"} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="bg-blue-400 border-2 border-black rounded-lg mt-[20px] p-[10px] w-[307px]  placeholder-black"/>
<div className="absolute bottom-[9px] right-[7px] ">
{visibility1?<Visibility onClick={()=>setVisibility1(false)}/>:<VisibilityOff onClick={()=>setVisibility1(true)}/>}
</div>
</div>
<div className="relative">
<input type={visibility2?"text":"password"} placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} className="bg-blue-400 border-2 border-black rounded-lg mt-[20px] p-[10px] w-[307px]  placeholder-black"/>
<div className="absolute bottom-[9px] right-[7px]">
{visibility2?<Visibility onClick={()=>setVisibility2(false)}/>:<VisibilityOff onClick={()=>setVisibility2(true)}/>}
</div>
</div>
<button type="submit" className="bg-gray-600 text-white px-[20px] py-[5px] rounded-md mt-[20px] ml-[106px]">Register</button>
<div className="mt-[20px] ml-[20px] flex">
  <div>Already have an account?</div>
  <div className="inline text-blue-700 cursor-pointer" onClick={()=>navigate("/login")}>Login</div></div>
</div>
    </form>
  )
}

export default Register
