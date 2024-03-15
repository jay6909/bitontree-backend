const mongoose = require("mongoose");
const validator = require("validator");
const config = require("../config/config");
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
  {

    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid Email Address",
      },
    },
    password: {
      type: String,
      trim: true,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      minlength: 8,
      required: true
    },

  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */

userSchema.statics.isEmailTaken = async function (email) {
  // static method to check if an email is already taken in the database
  const user = await this.findOne({email:email});
  // Returns true if user exists, otherwise false
  return !!user;
};

/**
 * Check if entered password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password)
}



userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});




/**
 * @typedef User
 */
const User = mongoose.model("User",userSchema);

module.exports.User = User;
module.exports = {User};

