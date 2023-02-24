import AuthModel from '../Model/AuthModel.js';
import UserModel from '../Model/UserModel.js'

const getUsers = async (req, res) => {
    const find = await UserModel.getUsers();
    console.log(find);

    if (find) {
        res.status(200).send(find.name)
    }
    else {
        res.status(500).send({ message: err.message })
    }
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

const signup = async (req, res) => {
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
    signup
}