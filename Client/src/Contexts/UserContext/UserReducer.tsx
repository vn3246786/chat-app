import { useSessionStorage } from "../../Hooks/useSessionStorage";
import { UserAction,  ApiStatusEnum, UserState, UserData } from "../../TypeDefinitions";




export function reducer(state:UserState,Action:UserAction):UserState{
switch (Action.type) {
    case ApiStatusEnum.START:
        return {
            loading:true,
            data:null,
            error:null
        }
    case ApiStatusEnum.SUCCESS:
        return {
            loading:false,
            data: useSessionStorage<UserData>("user",Action.payload.data),
            error:null
        }
    case ApiStatusEnum.FAILURE:
        return {
            loading:false,
            data:null,
            error:Action.payload.error
        }  
    case ApiStatusEnum.LOGOUT:
        return {
            loading:false,
            data:null,
            error:null
        }  

    default:
        return {...state}
}
}