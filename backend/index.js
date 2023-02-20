const express=require("express");
const cors=require("cors");
require("dotenv").config();
const {connection}=require("./Models/db");
const {userRoute}=require("./Routers/user.route")
const {authenticate}=require("./middlewares/authenticationPost");
const {postRoute}=require("./Routers/post.route");
const app=express();
app.use(cors());
app.use(express.json());
app.use("/user",userRoute);
app.use(authenticate);
app.use("/post",postRoute);



app.listen(process.env.PORT,async(req,res)=>{
    try{
        await connection;
        console.log(`connected to ${process.env.PORT}`);
    }catch(err){
        console.log({"error":err.message});
    }
})

