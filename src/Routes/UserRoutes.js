import { Router } from 'express'
import UsersController from '../Controller/UsersController.js'

const UsersRouter = Router()

UsersRouter.get('/', (req, res) => {
  return UsersController.getUsers(req, res)
})

UsersRouter.put('/', (req, res) => {
  return UsersController.insertUser(req, res)
})

UsersRouter.delete('/:id', (req, res) => {
  return UsersController.deleteUser(req, res)
})

UsersRouter.patch('/:id', (req, res) => {
  return UsersController.updateUser(req, res)
})

export default UsersRouter
