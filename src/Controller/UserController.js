import * as UserModel from '../Model/UserModel.js'

export const GetUsers = () => {

}

export const InsertUser = async (req, res) => {
    const user = req.body;
    const created = await UserModel.InsertUser(user);
    if (created) {
        console.log(created.name);
        res.statusCode = 201;
        res.send(created._id);
    } else {
        res.status(500);
    }
}