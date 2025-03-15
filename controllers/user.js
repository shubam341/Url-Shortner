const{v4: uuidv4}=require('uuid');
const User=require("../models/user");
const {setUser}=require('../service/auth')



//CREATING USER FOR SIGNUP
async function handleUserSignup(req,res){
  const{name,email,password}=req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}



//CREATING USER FOR LOGIN
async function handleUserLOgin(req,res){
  const{email,password}=req.body;
  const user=await User.findOne({email,password});
  
  
  
  if(!user) 
     return res.render("login",{
     error:"Invalid Username or Password",
  });


  //SETTING COOKIES
  const token=setUser(user);
  //CREting cookie
  res.cookie("token",token);
    return res.redirect("/");
}


module.exports={
    handleUserSignup,
    handleUserLOgin
};