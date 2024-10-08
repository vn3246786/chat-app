import axios from "axios";
import {  loginData, registerData,  UserDispatchFuctions,  } from "../../TypeDefinitions";
import { findError } from "../../FindError";
import { toast } from "react-toastify";
import { socket } from "../../App";


export async function register(user:registerData,dispatchFuctions:UserDispatchFuctions){
    dispatchFuctions.handleLoading()
try {
    const res =await axios.post("/api/users/register",user)
    if(findError(res.data)){
        dispatchFuctions.handleError(res.data)
        toast.error(res.data)
    }else dispatchFuctions.handleData(res.data)
} catch (error) {
    dispatchFuctions.handleError("network error")
    toast.error("network error")
}
}

export async function login(user:loginData,dispatchFuctions:UserDispatchFuctions){
    dispatchFuctions.handleLoading()
try {
    const res =await axios.post("/api/users/login",user)
    if(findError(res.data)){
        dispatchFuctions.handleError(res.data)
        toast.error(res.data)
    }else dispatchFuctions.handleData(res.data)
} catch (error) {
    dispatchFuctions.handleError("network error")
    toast.error("network error")
}
}



export function joinRoom(roomId:String,type:"Reciever"|"sender"){
    if(type==="sender"){
        socket.connect()
        socket.on("connect",()=>{
            console.log("connected")
        })
        socket.emit("join room",roomId)
    }else{
        socket.emit("join room",roomId)
    }

}

