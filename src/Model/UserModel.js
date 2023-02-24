import UserSchema from '../Schemas/UserSchema.js'

const insertUser = (user) => {
  const userCreated = new UserSchema({ ...user })
  return userCreated.save().then(
    (o) => {
      console.log('User Inserted')
      return o
    }
  ).catch(
    (e) => {
      console.log('Error on User Inserted', e)
      return null
    }
  )
}

const getUsers = () => {
  return UserSchema.find().then(
    (o) => {
      console.log('Users Found')
      return o
    }
  ).catch(
    (e) => {
      console.log('Error on Users Found', e)
      return null
    }
  )
}

export default {
  insertUser,
  getUsers
}
