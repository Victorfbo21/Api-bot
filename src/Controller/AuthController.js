import jwt from 'jsonwebtoken'
import AuthModel from '../Model/AuthModel.js'
import encodePassword from '../Utils/password.js'
const getToken = (id, role = 'user') => {
  const secret = process.env.TOKEN_SECRET

  const user = {
    id,
    role
  }
  const token = jwt.sign(user, secret, { expiresIn: Number.parseInt(process.env.TOKEN_LIFE) })
  const refreshToken = jwt.sign(user, secret, { expiresIn: Number.parseInt(process.env.TOKEN_REFRESH_LIFE) })
  const response = {
    status: 'Logged in',
    token,
    refreshToken
  }
  return response
}

const validateToken = (req, res, next) => {
  const secret = process.env.TOKEN_SECRET
  let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization

  if (token) {
    token = token.replace('Bearer', '').replace('bearer', '').replace(' ', '')
    // verifies secret and checks exp
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.status(401).json({ error: true, message: 'Unauthorized access.' })
      }
      req.decoded = decoded
      next()
    })
  } else {
    return res.status(403).send({
      error: true,
      message: 'No token provided.'
    })
  }
}

const login = async (req, res) => {
  const user = req.body
  const password = user.password
  const hash = encodePassword(password)
  user.password = hash
  const logged = await AuthModel.login(req.body)
  const token = getToken(logged, 'user')
  res.send({ logged, token })
}

export default {
  getToken,
  validateToken,
  login
}
