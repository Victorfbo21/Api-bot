import jwt from 'jsonwebtoken'
import AuthModel from '../Model/AuthModel.js'
import encodePassword from '../Utils/passwordHelper.js'
import userContextInstance from '../Utils/UserContext.js'
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
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.send(401).json({ error: true, message: 'Unauthorized access.' })
      }
      req.userContext = decoded
      userContextInstance.setGlobalState(req.userContext)
      next()
    })
  } else {
    return res.send(403).send({
      error: true,
      message: 'No token provided.'
    })
  }
}

const login = async (req, res) => {
  const user = req.body
  user.password = encodePassword(user.password)
  const logged = await AuthModel.login(user)
  if (logged) {
    const auth = getToken(logged, 'user')
    res.send({ logged, auth })
  } else { res.send(401) }
}

export default {
  getToken,
  validateToken,
  login
}
