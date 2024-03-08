const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const path = require("path")
const router = express.Router();

const app = express();

dotenv.config();

app.use(
    cors({
        origin:"http://localhost:3000",
        methods:"GET,POST,PUT,DELETE,PATCH",
        credentials: true
    }
))

mongoose.connect(process.env.mongo_link); 
app.use(express.json());

app.get("/", (req, res) => {
    try {
        return res.status(200).json("JSON Server is running");
    } catch (error) {
        console.log(error)
    }
})

app.listen(8000 || process.env.PORT, () => {
    console.log("Backend server is running!")
})