import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import { Novu } from "@novu/node";
import crypto from "crypto";
import bcrypt from "bcryptjs";

dotenv.config();

const novu = new Novu(process.env.NOVU_API_KEY);

async function checkNovu() {
    try {
        const response = await novu.getSubscribers();
        console.log("Kết nối Novu thành công!", response);
    } catch (error) {
        console.error("Lỗi kết nối Novu:", error.message);
    }
}

checkNovu();

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

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại" });
        }

        // Tạo token ngẫu nhiên
        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token hết hạn sau 1 giờ
        await user.save();

        // Gửi email qua Novu
        await novu.trigger("forgot-password", {
            to: { subscriberId: email, email },
            payload: {
                subject: "Đặt lại mật khẩu",
                message: `Nhấn vào liên kết để đặt lại mật khẩu: ${process.env.CLIENT_URL}/reset-password/${resetToken}`
            }
        });

        return res.json({ message: "Email đặt lại mật khẩu đã được gửi!" });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Kiểm tra token có còn hạn không
        });

        if (!user) {
            return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
        }

        // Hash mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();
        return res.json({ message: "Mật khẩu đã được đặt lại thành công!" });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};
