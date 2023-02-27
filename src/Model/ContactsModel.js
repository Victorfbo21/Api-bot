import ContactsSchema from "../Schemas/ContactsSchema.js"


const insertContact = (contact) => {
    const contactCreated = new ContactsSchema({ ...contact })
    return contactCreated.save().then(
        (o) => {
            console.log('Contact Inserted')
            return o
        }
    ).catch(
        (e) => {
            console.log('Error on Contact Inserted', e)
            return null
        }
    )
}


export default {
    insertContact
}