const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")

const validateToken=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(403).json({error:"No token, authorization denied"})
    }
    try {
        const validToken=jwt.verify(token,"farehaaslam") //valid token is decrypted  ismai username hai 
        req.user=validToken
        if(validToken){
            next()
        }
    } catch (error) {
        return res.status(401).json({error:"invalid token"})
    }
}

module.exports={validateToken}