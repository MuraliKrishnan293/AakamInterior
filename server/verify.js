const jwt = require("jsonwebtoken");
const SECRETKEY = "ABCDEFG";

const Middleware = async(req,res,next)=>{
    const token = req.headers.authorization && req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({
            message: "No token provided"
        });
    }
    try{
        const decoded = await jwt.verify(token, SECRETKEY);
        req.user = decoded;
        console.log("User id : ",req.user.id);
        next();
    }catch(err){
        return res.status(401).json({
            message: "Token is not valid"
        });
    }
}

module.exports = Middleware;