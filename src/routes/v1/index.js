const express =require ("express");
const userRoute=require('./user.route');
const authRoute=require('./auth.route');
const movieRoute=require('./movie.route');
const router=express.Router();

router.use("/users", userRoute);

//rpite all auth routes here
router.use('/auth', authRoute);

router.use('/movies', movieRoute);

module.exports=router
