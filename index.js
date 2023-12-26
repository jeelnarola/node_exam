const express = require("express");
const database = require("./Configs/db");
const ejs=require("ejs")
const router = require("./Routers/user.routers");
const cookie = require("cookie-parser");

// const ejs=require("ejs")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.set("views",__dirname+"/Views")
app.use(express.static(__dirname+"/public"))
app.use(cookie())
app.use(router)
app.listen(8090, () => {
    console.log("server start ");
    database()
})