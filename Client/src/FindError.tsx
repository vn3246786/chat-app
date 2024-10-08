import {   apiErrorTypes, chat, error, UserData } from "./TypeDefinitions";

export function findError(res:apiErrorTypes|UserData|chat):Boolean{
    
return (
    res===error.SERVER||res===error.NETWORK||res===error.CASTERROR||res===error.CHATEXISIST
)
}