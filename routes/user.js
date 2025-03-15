const express=require('express');
const{handleUserSignup,handleUserLOgin,}=require("../controllers/user")
const router=express.Router();


//CREATING SIGNUP PAGE FOR AUTHENICATION

router.post('/',handleUserSignup);
router.post('/login',handleUserLOgin);



module.exports=router;