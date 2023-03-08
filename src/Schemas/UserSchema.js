import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, validate: validateEmail },
  password: { type: String },
  phone: { type: String, unique: true, validate: validatePhone },
  doc: { type: String, unique: true, validate: validateDocument }

}, {
  timestamps: true
})

function validateEmail (email) {
  const expression = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
  return expression.test(email)
};

function validatePhone (phone) {
  const expressionNumber = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/
  return expressionNumber.test(phone)
}

function validateDocument (doc) {
  const expressionDocumento = /([0 - 9]{ 2}[.]?[0 - 9]{ 3 } [.] ? [0 - 9]{ 3 } [/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/
  return expressionDocumento.test(doc)
}

UserSchema.pre('save', function (next) {
  const user = this
  const salt = process.env.SALT
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  } else {
    return next()
  }
})

const User = mongoose.model('Users', UserSchema)

export default User
