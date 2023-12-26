let jwt=require('jsonwebtoken')
const cookie=require("cookie-parser")


const verifyToken=(req,res,next)=>{
    let {token}=req.cookies
   
    if(token){
        let decode=jwt.verify(token,"jeel")
        if(decode){
            req.user=decode
            next()
        }
        else{
            res.send({msg:"login...."})
        }
    }else{
        res.send({msg:"login or signup...."})
    }
}



module.exports=verifyToken