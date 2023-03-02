import MsgModel from '../Model/MsgModel.js'

const getMsg = async (req, res) => {
  const find = await MsgModel.getMsg(req.query.filter, req.query.skip, req.query.limit)
  if (find) {
    res.status(200)
  } else {
    res.status(500)
  }
}

const insertMsg = async (req, res) => {
  const msg = req.body
  const created = await MsgModel.insertMsg(msg)
  if (created) {
    res.statusCode = 201
    res.send(created._id)
  } else {
    res.status(400).send({ message: 'Menssagem ja Cadastrada' })
  }
}

const deleteMsg = async (req, res) => {
  const id = req.params.id
  const msgDeleted = await MsgModel.deleteMsg(id)
  if (msgDeleted) {
    res.status(201)
    res.send(msgDeleted._id)
  } else {
    res.status(500)
  }
}

const updateMsg = async (req, res) => {
  const id = req.params.id
  const update = { $set: req.body }
  const msgUpdate = await MsgModel.updateMsg(id, update)
  if (msgUpdate) {
    res.status(201)
    res.send(msgUpdate._id)
  } else {
    res.status(500)
  }
}

export default {
  getMsg,
  insertMsg,
  deleteMsg,
  updateMsg

}
