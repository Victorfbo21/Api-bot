import UserModel from '../Model/UserModel.js'

// TODO: Insert req.query to limit, filter and sort
const getUsers = async (req, res) => {
  const find = await UserModel.getUsers()
  if (find) {
    res.status(200)
  } else {
    res.status(500)
  }
}

const insertUser = async (req, res) => {
  const user = req.body
  const created = await UserModel.insertUser(user)
  if (created) {
    console.log(created.name)
    res.statusCode = 201
    res.send(created._id)
  } else {
    res.status(500)
  }
}

const deleteUser = async (req, res) => {
  const id = req.params.id
  const userDeleted = await UserModel.deleteUser(id)
  if (userDeleted) {
    res.status(201)
    res.send(userDeleted._id)
  } else {
    res.status(500)
  }
}

const updateUser = async (req, res) => {
  const id = req.params.id
  const update = { $set: req.body }
  const userUpdate = await UserModel.updateUser(id, update)
  if (userUpdate) {
    res.status(201)
    res.send(userUpdate._id)
  } else {
    res.status(500)
  }
}

const signup = async (req, res) => {
  const user = req.body
  const created = await UserModel.insertUser(user)
  if (created) {
    console.log(created.name)
    res.statusCode = 201
    res.send(created._id)
  } else {
    res.status(500)
  }
}

export default {
  getUsers,
  insertUser,
  signup,
  deleteUser,
  updateUser
}
