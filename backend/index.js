
const express=require("express")
const db=require("./models")
const app=express()
const port=3000
const cookieParser=require("cookie-parser")
app.use(express.json()); // Correct usage
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
//router
const postRouter=require("./routes/posts")
app.use("/api/posts",postRouter)
const commentRouter=require("./routes/comment")
app.use("/api/comment",commentRouter)
const userRouter=require("./routes/user");

app.use("/api/auth",userRouter)
const startServer = async () => {
    try {
      await db.sequelize.sync();
      app.listen(3000, () => {
        console.log('Server running on port 3000');
      });
    } catch (error) {
      console.error('Failed to sync database or start server:', error);
    }
  };
  
  startServer();
  