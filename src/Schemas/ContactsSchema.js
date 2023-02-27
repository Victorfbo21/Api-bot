import mongoose from 'mongoose'


const ContactsSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String, unique: true, required: true, validate: validateNumber },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', require: true }
}, {
    timestamps: true
})

function validateNumber(telefone) {
    const expressionNumber = /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/
    return expressionNumber.test(telefone)
}



const Contacts = mongoose.model('Contacts', ContactsSchema)

export default Contacts

