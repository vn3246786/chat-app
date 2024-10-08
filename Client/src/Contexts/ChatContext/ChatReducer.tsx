import { useSessionStorage } from "../../Hooks/useSessionStorage";
import { ChatAction, ChatState,  ApiStatusEnum,  chat} from "../../TypeDefinitions";




export function reducer(state:ChatState,Action:ChatAction):ChatState{
switch (Action.type) {
    case ApiStatusEnum.START:
        return {
            loading:true,
            data:state.data,
            error:null,
        }
    case ApiStatusEnum.SUCCESS:
        return {
            loading:false,
            data: useSessionStorage<chat>("chat",Action.payload.newData),
            error:null,

        }
    case ApiStatusEnum.FAILURE:
        return {
            loading:false,
            data:state.data,
            error:Action.payload.error,
        }  

    default:
        return {...state}
}
}