import { chat,  UserData } from "../TypeDefinitions"



export function useSessionStorage<T>(name:"chat"|"user",value:chat|UserData|null):T
{
    let data:T
if(value){
  sessionStorage.setItem(name,JSON.stringify(value))
   data =JSON.parse(sessionStorage.getItem(name)!)
return data
}else {
    return data = JSON.parse(sessionStorage.getItem(name)!) 
}
}