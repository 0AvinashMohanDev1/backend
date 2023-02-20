const jwt=require("jsonwebtoken");
require("dotenv").config();

function authenticate(req,res,next){
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token,process.env.modelSecret,(err,decoded)=>{
            if(err)res.send({"error":"error from authentication","err":err});
            else{
                req.body.userId=decoded.userId
                next();
            }
        })
    }else{
        res.send({"error":"login first"});
    }
}

module.exports={
    authenticate
}