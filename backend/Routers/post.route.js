const express=require("express");
const {postModel}=require("../Models/post.model");

const postRoute=express.Router();

postRoute.get("/top",async(req,res)=>{
    try{
        console.log(req.body)
        let data=await postModel.find({userId:req.body.userId});
        res.send(data);
    }catch(err){
        res.send({"error":err});
    }
})

postRoute.get("/search",async(req,res)=>{
    try{
        console.log(req.body)
        q=req.query.q;
        let data=await postModel.find({device:q});
        res.send(data);
    }catch(err){
        res.send({"error":err});
    }
})


postRoute.post("/create",async(req,res)=>{
    try{
        console.log(req.body);
        let payload=req.body;
        let post=new postModel(payload);
        await post.save();
        res.send({"msg":"post has been created"});
    }catch(err){
        res.send({"msg":"something wrong in posting"});
    }
})

postRoute.patch("/update",async(req,res)=>{
    try{
        await postModel.findByIdAndUpdate(req.userId);
        res.send({"msg":"data updated"})
    }catch(err){
        res.send({"error":err});
    }
})

postRoute.patch("/update",async(req,res)=>{
    try{
        await postModel.findByIdAndDelete(req.userId);
        res.send({"msg":"data deleted"})
    }catch(err){
        res.send({"error":err});
    }
})

module.exports={
    postRoute
}