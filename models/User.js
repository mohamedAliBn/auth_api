const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide name"],
        trim:true,
        maxLength:30
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Please provide email"],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please provide email"]
    },
    password:{
        type:String,
        required:[true,"Please provide password"],
        minLength:8
    }
})
// hashing password
UserSchema.pre("save",async function() {
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})
// compare passwprd
UserSchema.methods.comparePassword=async function(pass){
    const match=await bcrypt.compare(pass,this.password);
    return match;
}
// create token
UserSchema.methods.createJWT=function() {
    return jwt.sign(
        {userId:this._id,name:this.name},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_LIFITIME}
    )
}
// 
const User=mongoose.model("User",UserSchema)
module.exports=User;