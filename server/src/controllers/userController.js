import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config(); // Load biến môi trường từ file .env

// Đăng ký người dùng mới
export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        });
    }

    try {
        const { username, email, password, role } = req.body;

        // Kiểm tra nếu `username` bị null hoặc trống
        if (!username) {
            return res.status(400).json({
                message: "Tên người dùng không được để trống"
            });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo user mới
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        return res.status(201).json({
            message: "Đăng ký thành công",
            user: newUser
        });

    } catch (error) {
        return res.status(500).json({
            message: `Đăng ký thất bại: ${error.message}`
        });
    }
};


// Đăng nhập
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra người dùng có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Email hoặc mật khẩu không đúng"
            });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Email hoặc mật khẩu không đúng"
            });
        }

        // Tạo token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, // Đảm bảo `.env` có `JWT_SECRET`
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Đăng nhập thành công",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message:`lỗi ${error }`
        });
    }
};
