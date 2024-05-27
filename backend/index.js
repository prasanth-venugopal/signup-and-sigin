import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv'
import Authroute from "./routes/authroutes.js";
import connectDB from "./config/db.js"

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({extended :true}));

app.use("/register",Authroute)

mongoose.connect(process.env.MONGODB)
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err));

app.use((err, res, req) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'err';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});




const port = 4321
app.listen(port, () => {
    console.log(`App running on ${port}`)
})


