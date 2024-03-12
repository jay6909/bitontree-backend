const mongoose =require("mongoose");

const app=require('./app');
const config=require("./config/config");

mongoose.connect(config.mongoose.url).then(()=>{
    console.log("connected to mongoDB");
    app.listen(config.port,()=>{
        console.log(`server is running on port ${config.port}`);
    })
}).catch((error)=>{console.log(error.message)});