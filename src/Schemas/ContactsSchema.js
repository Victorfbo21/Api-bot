import mongoose from 'mongoose'
import OwnerHelper from '../Utils/OwnerHelper.js'

const ContactsSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, required: true, validate: validateNumber },
  ownerId: String
}, {
  timestamps: true
})

function validateNumber (telefone) {
  const expressionNumber = /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/
  return expressionNumber.test(telefone)
}

ContactsSchema.pre('save', OwnerHelper.setOwnerPreSave)

ContactsSchema.pre('find', OwnerHelper.findByOwner)

const Contacts = mongoose.model('Contacts', ContactsSchema)

export default Contacts
