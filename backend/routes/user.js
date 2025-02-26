const express=require("express")
const router=express.Router()
const {User}=require("../models")
const bcrypt=require("bcrypt");
const { where } = require("sequelize");
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const ACCESS_TOKEN_SECRET="farehaaslam"
const saltRound=6;
const {validateToken}=require("../Middlewares/AuthMiddleware")

router.use(cookieParser())
router.post("/",async (req,res) => {
    try {
        console.log(req.body);
        const {username,password} =req.body;
        const user=await User.findOne({where:{username:username}})
        console.log(user);
        if(!user){
            const hashedpassword= await bcrypt.hash(password,saltRound )
   const newUser= await  User.create({username,password_hash:hashedpassword})
    console.log("new user created succesfully");
    res.status(201).json({user:newUser})
        }
        else{
            res.json({message:"usr already exists"})
        }
     
    } catch (error) {
        res.status(500).json({message:error.message,})
    }  
})
router.post("/login",async(req,res)=>{
    try {
        console.log(req.body);
        const {username,password} =req.body;
        const user=await User.findOne({where:{username:username}})
        if(user){
            const hashedpassword=user.password_hash
            console.log(hashedpassword);
            const result=await bcrypt.compare(password,hashedpassword)
            if(result){
                const token=jwt.sign({username},ACCESS_TOKEN_SECRET,{expiresIn:"1h"})
                res.cookie("token",token,{httpOnly:true,maxAge:60*60*1000})

                
             return   res.status(200).json({message:"welcome back",success:true})
            }
            else{
             return   res.json({message:"wrong username or password"})
            }
        }
        else{
           return res.json({message:"invalid username"})
        }
        
    } catch (error) {
       return res.status(500).json(error.message)
        
    }
})
router.get("/isAuth",validateToken,(req,res)=>{
    console.log(req.user);
    res.json({Authenticated:true,user:req.user})
})
router.post("/logout",(req,res)=>{
    res.clearCookie("token")
    
    res.json({message:"logout successfully"})
})

module.exports=router