import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, required: true, unique: true, dropDups: true, index: true},
    password: { type: String, required: true },
})
const userModel = mongoose.model('User', userSchema);
export default userModel;