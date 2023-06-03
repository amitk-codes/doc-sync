const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JOI = require('joi')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.methods.generateToken = function () {
  // making a separate method to generate jwt tokens
  const token = jwt.sign({ _id: this._id }, process.env.SECRETKEY, { expiresIn: '7d' })
  return token
}

userSchema.pre('save', async function (next) {
  // while saving user, hashing the password
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Users = mongoose.model('user', userSchema)

const usersValidation = (input) => {
  // using joi for validation purpose
  const joiSchema = JOI.object({
    name: JOI.string().required(),
    email: JOI.string().email().required(),
    password: JOI.string().required()
  })
  return joiSchema.validate(input)
}






module.exports.Users = Users
module.exports.usersValidation = usersValidation