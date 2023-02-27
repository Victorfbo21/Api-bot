import { Router } from 'express'
import ContactsController from '../Controller/ContactsController.js'

const ContactsRouter = Router()

ContactsRouter.get('/', (req, res) => {
  return ContactsController.getContacts(req, res)
})

ContactsRouter.put('/', (req, res) => {
  return ContactsController.insertContact(req, res)
})

ContactsRouter.delete('/:id', (req, res) => {
  return ContactsController.deleteContact(req, res)
})

ContactsRouter.patch('/:id', (req, res) => {
  return ContactsController.updateContact(req, res)
})

export default ContactsRouter
