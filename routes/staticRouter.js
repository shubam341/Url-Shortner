const express = require('express');
const {restrictTo}=require("../middlewares/auth");
const URL=require("../models/url");

const router=express.Router();

router.get("/admin/urls",restrictTo(["ADMIN"]), async(req,res)=>{
    const allurls=await URL.find({});
return res.render("home",{
urls:allurls,
});
});


router.get("/",restrictTo(["NORMAL","ADMIN"]),async(req,res)=>{
    const allurls=await URL.find({createdBy: req.user._id});
    return res.render("home",{
   urls:allurls,
    });
});





router.get("/signup",(req,res)=>{
    return res.render("signup");
});


 
//ROUTER FOR LOGIN
 router.get("/login",(req,res)=>{
    return res.render("login");
});


  


     



module.exports=router;