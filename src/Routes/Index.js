import UserRouter from './UserRoutes.js'
import AuthRouter from './AuthRoutes.js'
import SignupRouter from './SignupRoutes.js'
import AuthController from '../Controller/AuthController.js'
import { Router } from 'express'
import ContactsRouter from './ContactsRoutes.js'
import MsgRouter from './MsgRoutes.js'

const Routers = Router()

Routers.use('/users', AuthController.validateToken, UserRouter)
Routers.use('/signup', SignupRouter)
Routers.use('/auth', AuthRouter)
Routers.use('/contacts', AuthController.validateToken, ContactsRouter)
Routers.use('/msg', MsgRouter)

export default Routers
