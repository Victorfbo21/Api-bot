import UserContext from './UserContext.js'

const setOwnerPreSave = next => {
  const data = this
  if (Object.keys(data).length && Object.keys(data).ownerId) {
    data.ownerId = UserContext.getPropertyByName('id')
    return next()
  }
  return next()
}

export default {
  setOwnerPreSave
}
