const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");

/**
 * Generate jwt token
 * @param {ObjectId} userId - Mongo user id
 * @param {Number} expires - Token expiration unix time 
 * @param {string} type - Access token type eg: Access, Refresh
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  // let token= jwt.sign({'sub':userId, type}, secret, {expiresIn:expires}  );
  // return token;

  const Payload = {
    sub: userId,
    iat: Math.floor(Date.now / 1000),
    type: type,
    exp: expires
  }
  return jwt.sign(Payload, secret);
  
};

/**
 * Generate auth token
 * @param {User} user
 * @returns {Promise<Object>}
 *
 * Example response:
 * "access": {
 *          "token": "eyJhbGciOiJIUzI1NiIs...",
 *          "expires": "2021-01-30T13:51:19.036Z"
 * }
 */
 const generateAuthTokens = async (user) => {
  const accessTokenExpires = Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;
  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    tokenTypes.ACCESS
  )
  return {
    access: {
      token: accessToken,
      expires: new Date(accessTokenExpires*1000)
    }
  }
};

module.exports = {
  generateToken,
  generateAuthTokens,
};