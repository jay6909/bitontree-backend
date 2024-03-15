const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const { User } = require("../models");

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {

  const user=await userService.getUserByEmail(email);
  if(!user){ throw new ApiError(httpStatus.UNAUTHORIZED,"there are no users with that email");}

  
  const isPassMatch=await user.isPasswordMatch(password)
  if(!isPassMatch){ throw new ApiError(httpStatus.UNAUTHORIZED,"Incorrect email or password");}

  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};