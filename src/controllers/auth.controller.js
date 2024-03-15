const httpStatus=require('http-status');
const catchAsync=require('../utils/catchAsync');
const {authService, userService, tokenService}=require('../services');


const registerUser=catchAsync(async(req, res)=>{
    const user =await userService.createUser(req.body);
    const tokens=await tokenService.generateAuthTokens(user);
    return res.status(httpStatus.CREATED).send({user,tokens});
})

const loginUser=catchAsync(async(req, res)=>{
    const {email, password}=req.body;
    const user=await authService.loginUserWithEmailAndPassword(email, password);
    const tokens=await tokenService.generateAuthTokens(user);
    return res.status(httpStatus.OK).send({user, tokens});
});
module.exports={registerUser, loginUser}