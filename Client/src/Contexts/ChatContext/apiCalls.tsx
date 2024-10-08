import axios from "axios";
import { findError } from "../../FindError";
import { ChatDispatchFuctions } from "../../TypeDefinitions";
import { toast } from "react-toastify";


export async function getChats(id:String,value:ChatDispatchFuctions){

  value.handleLoading()
    try {
        const res = await axios.get(`/api/users/chats/${id}`)
     if(findError(res.data)){
value.handleError(res.data)
 }else value.handleData(res.data)

    } catch (error) {
       value.handleError("network error")
    }
}

export async function addChat(id:String,senderId:string,value:ChatDispatchFuctions){

  value.handleLoading()
    try {
      const res = await axios.put(`/api/users/add-chat/${id}`,{id:senderId})
     if(findError(res.data)){
      value.handleError(res.data)
      toast.error(res.data)
 }else {
   value.handleData(res.data)
}
    } catch (error) {
       value.handleError("network error")
    }
}

export async function updateUnseenMessageCount(id:string,chatId:string){
  
   try {
     await axios.put(`/api/users/update-unseen/${id}`,{id:chatId})
   } catch (error) {
      console.log(error)
   }
}