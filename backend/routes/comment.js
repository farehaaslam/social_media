const express=require("express")
const router=express.Router()
const {Comments}=require("../models")
const {validateToken}=require("../Middlewares/AuthMiddleware")
router.post("/",validateToken ,async (req,res) => {
  try {
    const comment =req.body;
     console.log(req.user); //req.user  object containg username,iat,exp
     console.log(comment)
    const username=req.user.username
    comment.username=username //we added username in comment 
    console.log(comment);
   const newcomment= await Comments.create(comment)
    res.json(newcomment)
  } catch (error) {
    res.status(500).json({message:error.message,})
    
  }
    
})
router.get("/:postId",async(req,res)=>{
  const postId=req.params.postId
  const data=await Comments.findAll({where:{PostId:postId}})
  res.json(data)
})
router.delete("/delete/:id",validateToken,async (req,res) => {
  const id=req.params.id
  const comment=await Comments.findByPk(id)
  if(!comment) return res.status(404).json({message:"Comment not found"})
    else{
  comment.destroy()
  res.json({message:"Comment deleted"})}

})
module.exports=router
