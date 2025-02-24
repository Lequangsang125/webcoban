import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true }, // Đúng
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: "user" }, // Thêm role nếu cần
    resetPasswordToken: { type: String, default: null }, // Lưu token đặt lại mật khẩu
    resetPasswordExpires: { type: Date, default: null }, // Hạn token
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
export default User;
