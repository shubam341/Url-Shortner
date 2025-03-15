//STATEFULL AUTHENICATION


//USER MODEL
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
role:{
    type:String,
    required:true,
 default:"NORMAL",

},
password:{
     type:String,
     required:true,
     
},
},{timestamps:true});


//MAKING MODEL (PASSING USER SCHEMA )
const User=mongoose.model('User',userSchema);


module.exports=User;