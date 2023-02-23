import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: String
}, {
    timestamps: true,
});

const User = mongoose.model('Users', UserSchema);

export default User;