import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true, validate: validateEmail },
    password: { type: String },
    telefone: { type: String, unique: true, required: true, validate: validateNumber },
    cpf: { type: String, unique: true, required: true, validate: validateDocument },

}, {
    timestamps: true,
});


function validateEmail(email) {
    const expression = /^[a-zA-Z0-9.!#$%&'+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;
    return expression.test(email);
};

function validateNumber(telefone) {
    const expressionNumber = /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/;
    return expressionNumber.test(telefone);
}


function validateDocument(cpf) {
    const expressionDocumento = /([0 - 9]{ 2}[\.]?[0 - 9]{ 3 } [\.] ? [0 - 9]{ 3 } [\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    return expressionDocumento.test(cpf);
}

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        const salt = process.env.SALT;
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    }

    else {
        return next();
    }
});

const User = mongoose.model('Users', UserSchema);

export default User;