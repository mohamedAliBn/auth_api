require('dotenv').config();

const express=require("express");
const app=express();

//import files
const connectDB=require('./db/connect');
const authRotuer=require("./routes/user")
const authorization=require("./middlewares/authontication")

//middlewares
app.use(express.json())
app.use("/api/v1/auth",authRotuer)
app.get("/",(req,res)=> {
    res.send("<h1>auth api</h1>")
})
app.get("/api/v1/test",authorization,(req,res)=> {
    res.status(200).json({msg:"this is a test"})
})

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