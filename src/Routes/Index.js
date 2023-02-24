import UserRouter from './UserRoutes.js'
import AuthRouter from './AuthRoutes.js'
import SignupRouter from './SignupRoutes.js'
import AuthController from '../Controller/AuthController.js'
import { Router } from 'express'

const Routers = Router()

Routers.use('/users', AuthController.validateToken, UserRouter)
Routers.use('/signup', SignupRouter)
Routers.use('/login', AuthRouter)

export default Routers
