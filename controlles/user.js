const User=require('./../models/User')

const register=async (req,res)=> {
    const {name,email,password}=req.body;
    if(!name || !email || !password) {
        return res.status(200).json({msg:"Please provide name,email and password"})
    }
    try {
        const user=await User.create(req.body)
        const token=user.createJWT();
        res.status(200).json({user,token})
    }catch (error) {
        res.status(500).json(error)
    }
}

const login=async (req,res)=> {
    const {email,password}=req.body
    if(!email || !password) {
        return res.status(404).json({error:"Please provide email and passowrd"})
    }
    // check the email
    const user=await User.findOne({email});
    if(!user) {
        return res.status(404).json({error:`there is no user with the email ${email}`})
    };
    // check the password
    const isMatch=await user.comparePassword(password);
    if(!isMatch) {
        return res.status(404).json({error:`passwort is wrong`})
    }
    const token=user.createJWT();
    res.status(200).json({user,token})
}

module.exports={
    register,
    login
}