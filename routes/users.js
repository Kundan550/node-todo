import express from "express";
import cookieParser from "cookie-parser";
import { getAllusers,register, getMyProfile, login,logout } from "../contollers/users.js";
import { isAuthenticated } from "../middlewares/Auth.js";
const router  = express.Router();
router.use(cookieParser());
router.get("/all",getAllusers);

router.post("/new",register);
router.post("/login",login);

router.get("/logout" , logout);
router.get("/me",isAuthenticated,getMyProfile);

export default router;