import mongoose from "mongoose";

const Registerschema = mongoose.Schema({
    FName: { type: String, required: true },
    LName: { type: String, required: true },
    Emailid: { type: String, required: true, index: { unique: true } },
    Password: { type: String, required: true, minLength: [6, "should have atleast 6 characters"] },
    Gender: { type: String, enum: ["male", "female", "other"] }

})

Registerschema.methods.register = function () {
    let reg = this;
    reg.Name = reg.FName + reg.LName
    return reg.save();
}
const Register = mongoose.model("Register", Registerschema)
export default Register;