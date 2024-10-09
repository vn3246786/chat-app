const express = require("express")
const app = express()
const crypto = require("crypto")
const {createServer}=require("node:http")
const { Server } = require("socket.io");
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const usersRoute = require("./Routes/users")
const cors = require("cors")
const bodyParser = require("body-parser");
const Users = require("./Models/Users");
const { type } = require("os");

app.use(cors(
    {
        origin:process.env.CLIENT_URL
    }
))
app.use(bodyParser.json())
app.use(express.json())
const server = createServer(app)
const io = new Server(server,{
   cors:{
    origin:[`${process.env.CLIENT_URL}`]
   } 
})

app.use("/api/users",usersRoute)

io.on("connection", (socket)=>{

socket.on("join room",(value)=>{
    socket.join(value)

})

socket.on("leave room",(value)=>{
    socket.leave(value)
})

socket.on("disconnect",()=>{
})

socket.on("leave all",()=>{
    socket.rooms.forEach((room=>{
        if(room!==socket.id){
            socket.leave(room)
        }
    }))
})

socket.on("send",async (value)=>{
    const latest = Date.now()
        try {
            await Users.findOneAndUpdate({_id:value.senderId},
                {$set:{"chats.$[elem].latest":latest}},
                {arrayFilters:[{"elem.id":value.id}]},{new:true}
            )
            await Users.findOneAndUpdate({_id:value.senderId},
                {$push:{"chats.$[elem].messages":{message:value.message,type:"sent"}}},
            {arrayFilters:[{"elem.id":value.id}]},{new:true})
         const receiver = await Users.find({_id:value.id,chats:{$elemMatch:{id:value.senderId}}})
         if(receiver.length===0){
            await Users.findOneAndUpdate({_id:value.id},{$push:{"chats":{id:value.senderId,name:value.name,unseen:1,latest:latest,messages:[{message:value.message,type:"received"}]}}},{new:true})
            socket.to(value.id).emit("receive", value)
         }else {
            await Users.findOneAndUpdate({_id:value.id},
                {$set:{"chats.$[elem].latest":latest}},
                {arrayFilters:[{"elem.id":value.senderId}]},{new:true}
            )
            await Users.findOneAndUpdate({_id:value.id},
                {$inc:{"chats.$[elem].unseen":1}},
                {arrayFilters:[{"elem.id":value.senderId}]},{new:true},
                )
                await Users.findOneAndUpdate({_id:value.id},
                {$push:{"chats.$[elem].messages":{message:value.message,type:"received"}}},
                {arrayFilters:[{"elem.id":value.senderId}]},{new:true}
                )
            socket.to(value.id).emit("receive", value)
         }
        } catch (error) {
            console.log(error)
        }
})
})


server.listen(3000,async ()=>{
    console.log("server started")
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('mongodb connected');
    } catch (error) {
        console.log(error)
    }
  
})

