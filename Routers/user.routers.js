const { Router } = require("express");
const { home, register, taskList, login, taskForm, signup, login_Post, signout, taskForm_post } = require("../Controllers/user.controller");
const verifyToken = require("../Middlewares/verifyToken");



const router=Router()

router.get("/",home)
router.get("/register",register)
router.get("/login",login)
router.get("/taskList",taskList)
router.get("/taskForm",verifyToken,taskForm)

router.post("/register",signup)
router.post("/login",login_Post)
router.get("/signout",signout)
router.post("/taskForm",verifyToken,taskForm_post)


module.exports=router