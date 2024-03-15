const {Strategy: JwtStrategy, ExractJwt, ExtractJwt}=require ("passport-jwt");
const config =require('./config');
const {tokenTypes}=require('./tokens');
const {User}=require("../models");


const jwtOptions={
    secretOrKey:config.jwt.secret,
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken('authorization')
};


/**
 * @param payload - the payload the token was generated with
 * @param done - a callback funtion to be executed
 */
const jwtVerify=async(payload, done)=>{
    if(payload.type!==tokenTypes.ACCESS) done("Invalid token type");
    if(!payload.sub) done(null, false);
    const user =await User.findById(payload.sub);
    if(!user) done("not found",false);
    done(null, user);
};

const jwtStrategy= new JwtStrategy(jwtOptions, jwtVerify);
module.exports={jwtStrategy};