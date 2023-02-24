import UserSchema from '../Schemas/UserSchema.js'

export const login = (user) => {
    if (!user?.password || !user?.email) return null;
    console.log(user);
    return UserSchema.findOne({ password: user.password, email: user.email });
}

export default {
    login,
}