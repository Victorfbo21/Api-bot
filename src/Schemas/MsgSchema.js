import mongoose from 'mongoose'
import OwnerHelper from '../Utils/OwnerHelper.js'

const MsgSchema = new mongoose.Schema({
  contactId: { type: String },
  Msg: { type: String },
  isActive: { type: Boolean },
  schedule: {
    initialdate: Date,
    finaldate: Date,
    repetition: String
  },
  ownerId: { type: String }
}, {
  timestamps: true
})

MsgSchema.pre('save', OwnerHelper.setOwnerPreSave)

MsgSchema.pre('find', OwnerHelper.findByOwner)

const Msg = mongoose.model('Msg', MsgSchema)

export default Msg
