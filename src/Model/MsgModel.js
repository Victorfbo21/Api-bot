import MsgSchema from '../Schemas/MsgSchema.js'

const insertMsg = async (msg) => {
  const Msgs = await getOneMsg(msg.Msg, 0, 0)
  if (Object.values(Msgs).length === 0) {
    const msgCreated = new MsgSchema({ ...msg })
    return msgCreated.save().then(
      (o) => {
        console.log('Msg Inserted')
        return o
      }
    ).catch(
      (e) => {
        console.log('Error on Inserted Messages', e)
        return null
      }
    )
  } else {
    console.log('Menssagem já Cadastrada !')
  }
}

const getMsg = (filter, skip, limit) => {
  filter = filter || ''
  return MsgSchema.find({
    $or: [
      { contactId: new RegExp('.*' + filter + '.*', 'i') },
      { ownerId: new RegExp('.*' + filter + '.*', 'i') },
      { msg: new RegExp('.*' + filter + '.*', 'i') },
      { schedule: new RegExp('.*' + filter + '.*', 'i') }

    ]
  }).skip(skip || 0).limit(limit || 0).then(
    (o) => {
      return o
    }
  ).catch(
    (e) => {
      console.log('Error Finding Messages', e)
      return null
    }
  )
}
const getAllMsg = (filter) => {
  filter = filter || ''
  return MsgSchema.find(filter).then(
    (o) => {
      return o
    }
  ).catch(
    (e) => {
      console.log('Error Finding Messages', e)
      return null
    }
  )
}
const getOneMsg = (filter, skip, limit) => {
  filter = filter || ''
  return MsgSchema.find({
    $or: [
      { Msg: new RegExp('.*' + filter + '.*', 'i') }
    ]
  }).skip(skip || 0).limit(limit || 0).then(
    (o) => {
      return o
    }
  ).catch(
    (e) => {
      console.log('Error Finding Messages', e)
      return null
    }
  )
}

const deleteMsg = (id) => {
  return MsgSchema.findByIdAndRemove(id).then(
    (o) => {
      console.log('Msg Deleted')
      return o
    }
  ).catch(
    (e) => {
      console.log('Error on Msg Deleted')
    }

  )
}

const updateMsg = (id, update) => {
  return MsgSchema.findByIdAndUpdate(id, update).then(
    (o) => {
      console.log('Updated Msg')
      return o
    }
  ).catch(
    (e) => {
      console.log('Error on Updated Msg')
    }

  )
}

export default {
  insertMsg,
  getMsg,
  deleteMsg,
  updateMsg,
  getOneMsg,
  getAllMsg
}
