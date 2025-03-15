const express = require('express');
const path=require('path');
const cookieParser=require('cookie-parser')
const{connectToMongoDB}=require('./routes/mongo.js');
const { checkForAuthenication,restrictTo}=require('./middlewares/auth')

const URL=require('./models/url');


const urlRoute=require("./routes/url");
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user');

const app=express();
const PORT =8002;


connectToMongoDB('mongodb://localhost:27017/short-url')
//listeners
.then(()=> console.log("Mongodb connected"));

//Konwing engine 
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use( checkForAuthenication);


//GOING TO PARTICULAR PAGES URL

app.use('/url',restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/user",userRoute);
app.use("/", staticRoute);



app.get('/url/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
       shortId
    },
    {$push:{
        visitHistory:{
            timestamp:Date.now(),
        },
    },
},
{new: true}
);
// res.redirect('entry.redirectURL');
if (entry && entry.redirectURL) {
    res.redirect(entry.redirectURL);
} else {
    res.status(404).send("URL not found");
}
});



app.listen(PORT,()=> console.log(`Server Started at PORT:${PORT}`))