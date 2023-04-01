import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { sendCookie } from "../utils/features.js";
dotenv.config();
export const getAllusers = async (req,res)=>{
    
};

export const login = async (req,res,next)=>{
    
    try {
        const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user) 
    return next(new ErrorHandler("Invalid maessaGE OR PASSWORD",404 ));

    const  isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) 
    return res.status(404).json({
        succes:false,
        message:"invalid mail or password",
    });


    sendCookie(user,res,200,`welcome back ${user.name}`);
    } catch (error) {
        next(error);
    }
};

export const register = async (req,res,next)=>{
   try {
    const {name,email,password} = req.body;

    let user = await User.findOne({email});

    if(user) 
    return next(new ErrorHandler("user exist",404 ));

    const hashpass = await bcrypt.hash(password,10);

    user =  await User.create({name,email,password:hashpass});

     sendCookie(user,res,201,"registerd successfully");
   } catch (error) {
    next(error);
   }

    

};

export const getMyProfile =  (req,res)=>{

     res.status(200).json({
        success:true,
        user:req.user,
    })
    
};

export const logout =(req,res)=>{

     
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "development" ? "lax" : "none",
        secure:process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
        success:true,
        user:req.user,
    })

};


