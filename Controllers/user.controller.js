const jwt = require('jsonwebtoken');
const user = require("../Models/user.models")
const cookie=require("cookie-parser")
const bcrypt=require("bcrypt");
const task = require('../Models/task.models');
const home=(req,res)=>{
    res.render("taskList")
}
const register=(req,res)=>{
    res.render("register")
}
const taskList=(req,res)=>{
    res.render("taskList")
}
const login=(req,res)=>{
    res.render("login")
} 
const taskForm=(req,res)=>{
    res.render("taskForm")
}

// const register_Post=async(req,res)=>{
//     let {email,username,password,role}=req.body

//     let data=await user.findOne({email:email})
//     console.log(data);
//     if(data){
//         res.send("alredy extis user !")
//     }
//     else{
//        bcrypt.hash(password,5,(err,hash)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             let obj={email,password:hash,username,role}
//             let data = await user.create(obj);
//             let token = jwt.sign({id : data._id, role : data.role}, "private");
//             return res.cookie("token", token).cookie("role", data.role).send({msg : "User Signed up", value:data});
//         }
//        })
//     }
// }
const signup = async(req,res)=>{
    try {
        const {email, password,username,role} = req.body;
        let data = await user.findOne({email:email});
        if(data){
            return res.send({message : 'User already exist'});
        }
        else{
            bcrypt.hash(password,5,async(err, hash)=>{
                if(err){
                    return res.send({Error: err.message});
                }
                else{
                    let obj={email,password:hash,username,role}
                    let data = await user.create(obj);
                    let token = jwt.sign({id : data._id, role : data.role}, "jeel");
                    return res.cookie("token", token).cookie("role", data.role).send({msg : "User Signed up", value:data});
                }
            })
        }
        
    } catch (error) {
        return res.send({Error : error.message})
    }
}

const login_Post=async(req,res)=>{
    let {password,email}=req.body

    let data=await user.findOne({email:email})
    console.log(data);
    if(data){
        bcrypt.compare(password,data.password,(err,done)=>{
            if(err){
                console.log(err);
            }
            if(done){
                let token = jwt.sign({id : data._id, role : data.role}, "jeel");
                return res.cookie("token", token).cookie("role", data.role).send({message:'Login Successfully'})
            }else{
                res.send("password worng!")
            }
        })
    }else{
        res.send("user not !")
    }
}

const signout=(req,res)=>{
    res.clearCookie("token").clearCookie("role").send("User Log-Out")
}
const taskForm_post=async(req,res)=>{

    let {title,category}=req.body
    req.body.createdby=req.user.id
    
    let data=await task.create(req.body)
    res.send("task")

}
module.exports={home,register,taskList,login,taskForm,signup,login_Post,signout,taskForm_post}