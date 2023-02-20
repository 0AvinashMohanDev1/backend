const express=require("express");
const {userModel}=require("../Models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userRoute=express.Router();

userRoute.get("/",async(req,res)=>{
    data=await userModel.find();
    res.send(data);
})



userRoute.post("/register",async(req,res)=>{
    let payload=req.body;
    try{
        let data= userModel.find({email:payload.email});
        if(data.length>0){
            res.send({"msg":"User already exist, please login"});
        }else{
            bcrypt.hash(payload.password,5,async(err,hash)=>{
                if(err){
                    res.send({"error":"error while hashing pass"})
                }else{
                    payload.password=hash
                    let user=new userModel(payload);
                    user.save();
                    res.send({"msg":"user registerd"})
                }
            })
        }
    }catch(err){
        res.send({"error":"something wrong in registring"})
    }
})

userRoute.post("/login",async(req,res)=>{
    let payload=req.body;
    let data=await userModel.find({email:payload.email});
    if(data.length>0){
        bcrypt.compare(payload.password,data[0].password,(err,result)=>{
            if(err)res.send({"msg":"wrong password"})
            else {
                try{
                    let token=jwt.sign({userId:data[0]._id},process.env.modelSecret);
                    res.send({"msg":"logged in","token":token});
                }catch(err){
                    res.send({"error":"error while password checking"})
                }
            }
        })        
    }else{
        res.send({"error":"no match, register first"})
    }
})


module.exports={
    userRoute
}