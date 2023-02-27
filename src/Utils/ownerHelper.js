import userContextInstance from './UserContext.js'

const setOwnerPreSave = function (next) {
  const data = this
  if (Object.keys(data).length) {
    data.ownerId = userContextInstance.getPropertyByName('id')
  }
  next()
}

const findByOwner = function () {
  this.where({ ownerId: userContextInstance.getPropertyByName('id') })
}

export default {
  setOwnerPreSave,
  findByOwner
}
