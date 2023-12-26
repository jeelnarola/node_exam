const { Router } = require("express");
const { home, register, taskList, login, taskForm, signup, login_Post, signout, taskForm_post, mytask, taskListGet, admindelet, allTask, taskItem } = require("../Controllers/user.controller");
const verifyToken = require("../Middlewares/verifyToken");
const task = require("../Models/task.models");
const user = require("../Models/user.models");



const router=Router()

router.get("/",home)
router.get("/register",register)
router.get("/login",login)
router.get("/taskList",taskList)
router.get("/taskForm",verifyToken,taskForm)
router.get("/taskList",taskListGet)
router.get("/taskItem",taskItem)
router.post("/register",signup)
router.post("/login",login_Post)
router.get("/signout",signout)
router.post("/taskForm",verifyToken,taskForm_post)

router.get("/mytask",verifyToken,mytask)

router.delete("/delete/:id",admindelet)


router.get("/edit/:id",async(req,res)=>{
    let {id}=req.params
    let data=await task.findById(id)
    console.log(data);
    res.render("taskForm",{data,edit:true})
})

router.patch("/edit/:id",async(req,res)=>{

    let {id}=req.params
    let data=await task.findByIdAndUpdate(id,req.body)
    res.send(data)

})

router.get("/allTask",allTask)



module.exports=router