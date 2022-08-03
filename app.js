require('dotenv').config();

const express=require("express");
const app=express();

//import files
const connectDB=require('./db/connect');
const authRotuer=require("./routes/user")
const authorization=require("./middlewares/authontication")

// extra security package
const cors=require("cors");
const helmet=require("helmet");
const xssClean=require("xss-clean");
const rateLimit=require("express-rate-limit");

//middlewares
app.set("trust proxy",1)
app.use(express.json())
app.use(cors())
app.use(helmet());
app.use(xssClean())
app.use(rateLimit({
    windowMs:15 * 60 * 1000,
    max:100
}))

// routes
app.use("/api/v1/auth",authRotuer)
app.get("/",(req,res)=> {
    res.send("<h1>auth api</h1>")
})
app.get("/api/v1/test",authorization,(req,res)=> {
    res.status(200).json({msg:"this is a test"})
})

// connect to db
const port=process.env.PORT || 8080
const start=async ()=> {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port ,()=> console.log(`listen to port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start();