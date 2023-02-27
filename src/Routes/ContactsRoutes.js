import { Router } from 'express'
import ContactsController from '../Controller/ContactsController.js'

const ContactsRouter = Router()

ContactsRouter.put('/', (req, res) => {
    return ContactsController.insertContact(req, res)
})

export default ContactsRouter

