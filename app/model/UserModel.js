import mongoose from "mongoose";

const users = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true},
        email: { type: String, required: true, unique: true },
        mobile: { type: String, require: true, unique: true},
        password: { type: String, require: true, unique: true},
        otp: { type: String, default: "0"}
    },
    {
        timestamps: true,
        versionKey: false
    }
)
const UsersModel = mongoose.model('users', users);
export default UsersModel;