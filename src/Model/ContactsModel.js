import ContactsSchema from '../Schemas/ContactsSchema.js'

const insertContact = (contact) => {
  const contactCreated = new ContactsSchema({ ...contact })
  return contactCreated.save().then(
    (o) => {
      return o
    }
  ).catch(
    (e) => {
      console.log('Error on Contact Inserted', e)
      return null
    }
  )
}

const getContacts = (filter, skip, limit) => {
  filter = filter || ''
  return ContactsSchema.find({
    $or: [
      { name: new RegExp('.*' + filter + '.*', 'i') },
      { phone: new RegExp('.*' + filter + '.*', 'i') }
    ]
  }).skip(skip || 0).limit(limit || 0).then(
    (o) => {
      return o
    }
  ).catch(
    (e) => {
      console.log('Error on Contacts Found', e)
      return null
    }
  )
}

const deleteContact = (id) => {
  return ContactsSchema.findByIdAndRemove(id).then(
    (o) => {
      return o
    }
  ).catch(
    (e) => {
      console.log('Error on Delete Contact')
    }

  )
}

const updateContact = (id, update) => {
  return ContactsSchema.findByIdAndUpdate(id, update).then(
    (o) => {
      return o
    }
  ).catch(
    (e) => {
      console.log('Error on Updated Contact')
    }

  )
}

export default {
  insertContact,
  deleteContact,
  updateContact,
  getContacts
}
