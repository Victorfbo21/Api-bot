import UserModel from '../Model/UserModel.js'

const getUsers = () => {

}

const insertUser = async (req, res) => {
    const user = req.body;
    const created = await UserModel.insertUser(user);
    if (created) {
        console.log(created.name);
        res.statusCode = 201;
        res.send(created._id);
    } else {
        res.status(500);
    }
}

export default {
    getUsers,
    insertUser,
}