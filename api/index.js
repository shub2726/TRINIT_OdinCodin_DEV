const express = require("express")
const cors = require("cors")
const router = express.Router();

const app = express();

app.use(
    cors({
        origin:"http://localhost:3000",
        methods:"GET,POST,PUT,DELETE,PATCH",
        credentials: true
    }
))

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