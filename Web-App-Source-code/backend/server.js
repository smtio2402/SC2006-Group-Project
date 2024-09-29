import express from 'express';
import cors from 'cors'
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js"


dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000

// Enable CORS
app.use(cors());

app.get("/", (req, res) => {
    res.send("server is ready");
}); 

app.use(express.json()); //allow us to pass JSON data in the request body

app.use("/", userRoutes);


app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

//MjktkjnvA35MiCYP