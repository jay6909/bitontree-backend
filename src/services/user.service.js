const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

/**
 * @param {String} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

/**
 * @param {string} email
 * @returns {Promise<User>}
 */
async function getUserByEmail(email) {
  const user = await User.findOne({ email: email });
  return user;
}

/**
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "Jayaditya Gaikwad",
 *  "email": "gaikwadjayaditya@bitree.com",
 *  "password": "usersPasswordHashed"
 * }
 */

 const createUser = async (userBody) => {
  const {email} = userBody;
  const alreadyExists = await User.isEmailTaken(email);
  if(alreadyExists){
      throw new ApiError(httpStatus.OK, "Email Already Taken")
  } else {

      const newUser= await User.create(userBody)
      
      return newUser;
  }
}



module.exports = { getUserById, getUserByEmail, createUser, };