const express=require("express")
const router=express.Router()
const app=express()

const {Posts}=require("../models")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//all posts
router.get("/",async (req,res)=>{
    const allpost=await Posts.findAll()
    res.json(allpost)
})
//post a req
router.post("/",async (req,res)=>{
    const post=req.body;
    //hum ne client side par post ko obj bheja tha as req 
    //crete is meathod of sequelizer
   await Posts.create(post);
   res.json(post)
})
//specific post
router.get("/:id",async (req,res)=>{
    const id=req.params.id
    const data=await Posts.findByPk(id)
   res.json(data)
})


module.exports=router