import bcrypt from 'bcrypt'

const encodePassword = (password) => {
  const salt = process.env.SALT
  const hashpassword = bcrypt.hashSync(password, salt)
  return hashpassword
}

export default encodePassword
