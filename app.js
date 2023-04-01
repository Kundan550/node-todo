import express from "express";
import userRouter from "./routes/users.js"
import taskRouter from "./routes/task.js"
import cors from "cors";
import mongoose from "mongoose";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();

//usng middleware
app.use(express.json());
app.use("/users",userRouter);
app.use("/tasks",taskRouter);
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET", "POST", "PUT","DELETE"],
    credentials:true,
}));
//app.use(cookieParser);




mongoose.connect("mongodb://localhost:27017",{
    dbname:"backendapi",
}).then(()=>console.log("Database connected"))
.catch((e)=>console.log(e));





app.get("/" ,(req,res)=>{
    res.send("nice working");
})

app.listen("4000" ,()=>{
    console.log("server is working");
})


app.use(errorMiddleware);