import React, { Dispatch } from "react"

export interface UserData {
_id:string,
username:string,
email:string,
createdAt:Number,
updatedAt:Number,
__v:Number
}

export interface fetchChat{
    loading:Boolean,
    data:chat|null,
    error:string|null
}



export interface message{
message : string,
 type:string,
}

export type messages = message[]

export interface newMessage{
    name : string,
    senderId:string,
    id : string,
    message:string,

}

export interface chatObject {
    name : string,
    id : string,
    unseen:number,
    messages:messages,
    }

export type chat =chatObject[]|null


export type dispatch = Dispatch<UserAction>

export interface userContextInitial{
    handleLoading:()=>void,
    handleData:(data:UserData)=>void,
    handleError:(error:string)=>void,
    logOut:()=>void,
    userLoading:Boolean,
    userData:UserData|null,
    userError:string|null
}

export interface chatContextInitial{
    handleLoading:()=>void,
    handleData:(data:chat)=>void,
    handleError:(error:string)=>void,
    chatLoading:Boolean,
    chatData:chat|null,
    chatError:string|null
}


export interface countContextInitial{
    unseenMessagesCount:number,
    setUnseenMessagesCount: React.Dispatch<React.SetStateAction<number>>|null
}

export interface children {children :React.ReactNode}

export enum ApiStatusEnum {
    START="start",
    SUCCESS="success",
    FAILURE="failure",
    LOGOUT="logout",
    NEWMESSAGE="new message"
}

export enum error {
    SERVER="server error",
    NETWORK="network error",
    CASTERROR="id is invalid",
    CHATEXISIST="chat already exists"
}

export interface UserState {
    loading:Boolean,
    data:UserData|null,
    error:string|null
}

export interface ChatState {
    loading:Boolean,
    data:chat|null,
    error:string|null
}

 
export interface UserAction {
    type:"start"|"success"|"failure"|"logout",
    payload:{
        data:UserData|null,
        error:string|null,
    }
}

export interface ChatAction {
    type:"start"|"success"|"failure"|"new message",
    payload:{
        newData:chat|null,
        error:string|null,
    }
}

export interface registerData{
    username:string,
    email:string,
    password:string
}

export interface loginData{
    email:string,
    password:string
}

export interface UserDispatchFuctions {
    handleLoading:()=>void,
    handleData:(data:UserData)=>void,
    handleError:(error:string)=>void,
}

export interface ChatDispatchFuctions {
    handleLoading:()=>void,
    handleData:(data:chat)=>void,
    handleError:(error:string)=>void,
}

export type apiErrorTypes = error.NETWORK|error.SERVER|error.CASTERROR|error.CHATEXISIST