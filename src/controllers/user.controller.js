const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

/**
 * Get user details
 * @returns {User | {address: String}}
 *
 */
const getUser = catchAsync(async (req,res) => {
  if(!req.user.email) {throw new ApiError(500,"No user exists")}

  if( req.user._id != req.params.userId) throw new ApiError(httpStatus.FORBIDDEN, "User not Authenticated to see other user's data");
  if(req.query.q=='address'){
    try {
      const address=await userService.getUserAddressById(req.user._id)
    if(address.email != req.user.email)  throw new ApiError(httpStatus.FORBIDDEN, "User not Authenticated to see other user's data");

    // console.log("sucessfully fetched addresss", address)
    return res.status(200).send({address:address.address});
    } catch (error) {
     console.log("error while fetching address", error) 
    }
  }
  const userData= await userService.getUserById(req.user._id)

  if(req.user.email !== userData.email){
    throw new ApiError(httpStatus.FORBIDDEN, "User not Authenticated to see other user's data");
  }
  if(!userData) throw new ApiError(httpStatus.BAD_REQUEST,"")
  return res.status(200).send(userData)
  
});



module.exports = {
  getUser,
};