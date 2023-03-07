import UserSchema from '../Schemas/UserSchema.js'

const insertUser = (user) => {
  const userCreated = new UserSchema({ ...user })
  console.log(userCreated)
  return userCreated.save().then(
    (o) => {
      return o
    }
  ).catch(
    (e) => {
      console.log('Error on User Inserted', e)
      return null
    }
  )
}

const getUsers = (filter, skip, limit) => {
  filter = filter || ''
  return UserSchema.find({
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
      return null
    }
  )
}

const deleteUser = (id) => {
  return UserSchema.findByIdAndRemove(id).then(
    (o) => {
      return o
    }
  ).catch(
    (e) => {
      console.log('Error on Delete User')
    }

  )
}

const updateUser = (id, update) => {
  return UserSchema.findByIdAndUpdate(id, update).then(
    (o) => {
      return o
    }
  ).catch(
    (e) => {
      console.log('Error on Updated User')
    }

  )
}

export default {
  insertUser,
  getUsers,
  deleteUser,
  updateUser
}
