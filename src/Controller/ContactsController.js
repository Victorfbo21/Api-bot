import ContactsModel from "../Model/ContactsModel.js"


const insertContact = async (req, res) => {
    const contact = req.body
    const created = await ContactsModel.insertContact(contact)
    if (created) {
        console.log(created.name)
        res.statusCode = 201
        res.send(created._id)
    } else {
        res.status(500)
    }
}


export default {
    insertContact
}