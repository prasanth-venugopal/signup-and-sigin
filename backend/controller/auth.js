import User from "../model/user.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
const saltround=5;

export const Signup = async (req, res) => {
    const { FName, LName, Emailid, Password } = req.body;
    try {
        const hashpwd = await bcrypt.hash(Password, saltround);
        const reg = new User({
            FName,
            LName,
            Emailid,
            Password: hashpwd,
        });
        await reg.register();
        res.status(201).json({ success: true, message: "Registration successful", user: reg });
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({ success: false, message: "Registration failed. An error occurred." });
    }
};
export const Login = async (req, res) => {
    const data = req.body;
    try {
      const reg = await User.findOne({ Emailid: data.Emailid });
      if (reg) {
        const token = jwt.sign({ Emailid: data.Emailid }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        const campres = await bcrypt.compare(data.Password, reg.Password);
        if (campres) {
          res.json({ success: true, message: "Login successful!", token });
        } else {
          res.json({ success: false, message: "Check your username and password." });
        }
      } else {
        res.json({ success: false, message: "User not found." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "An error occurred. Please try again." });
    }
  };
