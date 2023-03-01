import { Router } from 'express'
import MsgController from '../Controller/MsgController'

const MsgRouter = Router()

MsgRouter.get('/', (req, res) => {
  return MsgController.getMsg(req, res)
})

MsgRouter.put('/', (req, res) => {
  return MsgController.insertMsg(req, res)
})

MsgRouter.delete('/:id', (req, res) => {
  return MsgController.deleteMsg(req, res)
})

MsgRouter.patch('/:id', (req, res) => {
  return MsgController.updateMsg(req, res)
})
