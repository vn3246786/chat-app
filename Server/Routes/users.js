const Router = require("express").Router()
const Crypto = require("crypto-js")
const Users = require("../Models/Users")

Router.post("/register",async(req,res)=>{
    const password = Crypto.AES.encrypt(req.body.password, process.env.CRYPTO_SECRET_KEY).toString();
    const user = new Users({
        username:req.body.username,
        email:req.body.email,
        password:password
    })
    try {
       const newUser= await user.save()
       const {password,chats,...data}=newUser._doc
    res.json(data)
    } catch (error) {
        if(error.code===11000){
            if(error.keyPattern.username){
                res.json("username already exists")
            }else res.json("email already exists")
        }else res.json("server error")
    }
})


Router.post("/login",async(req,res)=>{
try {
    const user = await Users.findOne({email:req.body.email})
    
if(user)
    {
    const bytes  = Crypto.AES.decrypt(user.password, process.env.CRYPTO_SECRET_KEY);
        const originalPassword = bytes.toString(Crypto.enc.Utf8)
if(originalPassword===req.body.password){
    const {password,chats,...data}=user._doc
    res.json(data)
}else res.json("username or password is incorrect")
}else{
res.json("username or password is incorrect")
}

} catch (error) {
    console.log(error)
    res.json("server error")
}

})

Router.get("/chats/:id",async (req,res)=>{
try {
    const user = await Users.aggregate([
        {$match:{$expr:{$eq:["$_id",{$toObjectId:req.params.id}]}}},
        {$project:{
            _id:0,
         result:{
            $sortArray:{input:"$chats",sortBy:{latest:-1}},
        }}},
        // {$project:{arr:{$slice:["$result",10]}}}
          
    ])
  
    res.json(user[0].result)
} catch (error) {
    console.log(error)
    res.json("server error")
}
})

Router.put("/add-chat/:id",async (req,res)=>{
   
try {
    const ifexist = await Users.findById(req.params.id)
    if(ifexist.chats.map((value)=>{
return value.id
    }).includes(req.body.id)){
        res.json("chat already exists")
    }else{
        const newUser = await Users.findById(req.body.id)
        const user = await Users.findByIdAndUpdate(req.params.id,{$push:{"chats":{
            name:newUser.username,
            unseen:0,
            id:newUser._id.toString(),
            latest:Date.now(),
            messages:[]
        }}},{new:true})
        const {chats,...rest}=user._doc
        res.json(chats)
    }
} catch (error) {
    console.log(error)
if(error.kind==="ObjectId"){
    res.json(`id is invalid`)
}else 
    res.json("server error")
}
})

Router.put("/update-unseen/:id",async (req,res)=>{
try {
   await Users.findOneAndUpdate({_id:req.params.id},
        {$set:{"chats.$[elem].unseen":0}},
    {arrayFilters:[{"elem.id":req.body.id}]},{new:true})

    res.end()
} catch (error) {
    console.log(error)
}
    

})

module.exports = Router