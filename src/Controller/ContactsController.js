import ContactsModel from '../Model/ContactsModel.js'

// TODO: verify exists contact on user
const insertContact = async (req, res) => {
  const contact = req.body
  const created = await ContactsModel.insertContact(contact)
  if (created) {
    res.status(201).send(created._id)
  } else {
    res.send(500)
  }
}

// TODO: filter, sort, limit
const getContacts = async (req, res) => {
  const find = await ContactsModel.getContacts(req.query.filter, req.query.skip, req.query.limit)
  if (find) {
    res.status(200).send(find)
  } else {
    res.send(500)
  }
}

const deleteContact = async (req, res) => {
  const id = req.params.id
  const contactDeleted = await ContactsModel.deleteContact(id)
  if (contactDeleted) {
    res.send(200)
  } else {
    res.send(500)
  }
}

const updateContact = async (req, res) => {
  const id = req.params.id
  const update = { $set: req.body }
  const contactUpdate = await ContactsModel.updateContact(id, update)
  if (contactUpdate) {
    res.send(200)
  } else {
    res.send(500)
  }
}

export default {
  insertContact,
  deleteContact,
  updateContact,
  getContacts
}
