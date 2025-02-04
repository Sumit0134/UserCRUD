const express=require("express");

const router=express.Router();

const createUser=require("../../controllers");

router.post("/createUser", createUser);  

module.exports=router;