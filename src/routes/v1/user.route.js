const express=require('express');
const validate=require('../../middlewares/validate');
const userValidation=require('../../validations/user.validation');
const userController=require('../../controllers/user.controller');

const {User}= require('../../models');
const {userService}=require('../../services');
const auth=require('../../middlewares/auth');
const router=express.Router();

router.get("/:userId", auth, validate(userValidation.getUser), userController);

module.exports=router