import mongoose from "mongoose";
const UserSchema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;
const User = new UserSchema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const UsersModel = mongoose.model("User", User);
export default UsersModel;
//# sourceMappingURL=Users.js.map