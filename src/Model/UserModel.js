import UserSchema from '../Schemas/UserSchema.js'
export const InsertUser = (user) => {
    console.log(user);
    const userCreated = new UserSchema({ ...user });
    return userCreated.save().then(
        (o) => {
            console.log('User Inserted');
            return o;
        }
    ).catch(
        (e) => {
            console.log('Error on User Inserted', e)
            return null;
        }
    )
}