const express=require("express");
const compression =require("compression");
const cors=require('cors');
const httpStatus=require('http-status');
const routes=require('./routes/v1');

const {errorHandler}=require('./middlewares/error');
const ApiError=require('./utils/ApiError');
const {jwtStrategy}=require('./config/passport');
const helmet =require('helmet');
const passport =require('passport');

const app =express();
// set security HTTP headers
app.use(helmet());
//parse json rq body
app.use(express.json());

//parse urlencoded req body

app.use(express.urlencoded({extended:true}));

//gzip compression
app.use(compression());

//enable cors
app.use(cors());
app.options("*", cors());

//initializing passport and jwt authentication
passport.use(jwtStrategy);
app.use(passport.initialize());

//route all req starting with /v1 route
app.use("/v1", routes);

//send back 404 error for any unknown api requests
app.use((req, res, next)=>{
    next(new ApiError(httpStatus.NOT_FOUND, "Url is not found"));
});

//handle errors
app.use(errorHandler);

module.exports=app;