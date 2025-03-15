const {getUser}=require("../service/auth");


//CRETAIG AUTHentication BASED TOKENS 
function checkForAuthenication(req,res,next){
    const tokenCookie=req.cookies?.token;
    req.user=null;
    if(!tokenCookie)
        return next();

    const token=tokenCookie;
    const user=getUser(token);

    req.user=user;
    return next();
}



//CRETAIG AUTHORIZATION BASED TOKENS
function restrictTo(roles=[]){
return function(req,res,next){
    if(!req.user) 
        return res.redirect("/login");


    if(!roles.includes(req.user.roles))  return res.end("unAuthorized");
return next();
}
}


module.exports={
    checkForAuthenication,
    restrictTo   

    }