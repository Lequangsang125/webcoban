import express from "express";
import { check } from "express-validator";
import { login, register, forgotPassword, resetPassword } from "../controllers/userController.js";

const authRouter = express.Router();

// Đăng ký
authRouter.post(
    "/register",
    [
        check("username", "Tên người dùng không được để trống").notEmpty(),
        check("email", "Email không hợp lệ").isEmail(),
        check("password", "Mật khẩu phải có ít nhất 6 ký tự").isLength({ min: 6 }),
    ],
    register
);

// Đăng nhập
authRouter.post("/login", login);

// Quên mật khẩu
authRouter.post("/forgot-password", forgotPassword);

// Đặt lại mật khẩu
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
