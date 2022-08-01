const jwt=require("jsonwebtoken");

// for cheek if the use signin or signup (token)
const authontication=async function(req,res,next) {
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(404).json({error:"invalid token"})
    }
    const token=authHeader.split(" ")[1]
    try {
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        req.user={userId:payload.userId,name:payload.name};
        next();
    }catch (error) {
        res.status(500).json({error})
    }
}


module.exports=authontication;