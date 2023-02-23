import UserSchema from '../Schemas/UserSchema.js'

export const login = (user) => {
    if (!user?.password || !user?.email) return null;
    return UserSchema.findOne({ password: user.password, email: user.email });
}

export default {
    login
}