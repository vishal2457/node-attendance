
//import express
const express= require("express");

//import connection of db
const  connectDB=require("./config/db");

//import body parser
const bodyparser= require('body-parser');

//create new app
const app=express();

//database connection 
connectDB();

//parse requests of content-type - application/x-www-form-urlencoded and parse reqsts of content type appliction-json
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

// app.use(express.static(_dirname +"/"));

//define routes
app.use("/api/user",require("./routes/api/user"));
app.use("/api/auth",require("./routes/api/auth"));



const PORT=process.env.PORT || 3000;

//listen on port 
app.listen(PORT,()=>{
    console.log("Server is runnning on port " + PORT);
});