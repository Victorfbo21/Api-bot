let instance

const initialState = () => {
  return JSON.parse(JSON.stringify({
    id: '',
    role: ''
  }))
}

let globalState = initialState()

class UserContext {
  constructor () {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }

  getPropertyByName (propertyName) {
    return globalState[propertyName]
  }

  setPropertyValue (propertyName, propertyValue) {
    globalState[propertyName] = propertyValue
  }

  destroy () {
    globalState = initialState()
  }
}

const userContextInstance = Object.freeze(new UserContext())

export default userContextInstance
