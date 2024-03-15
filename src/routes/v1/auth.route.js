const express=require('express');

const validate=require('../../middlewares/validate');

const authValidation =require("../../validations/auth.validation");
const authController=require('../../controllers/auth.controller');
const httpStatus=require("http-status");

const auth=require('../../middlewares/auth');

const router =express.Router();


router.post("/register",validate(authValidation.register), authController.registerUser);
router.post("/login",validate(authValidation.login),authController.loginUser);

module.exports = router;