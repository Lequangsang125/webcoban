// Import mongoose và dotenv
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load biến môi trường từ .env
dotenv.config();

// Lấy URI từ biến môi trường
const mongoURI = process.env.MONGO_URI;

// Hàm kết nối MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Kết nối MongoDB thành công!');
    } catch (error) {
        console.error('❌ Lỗi kết nối MongoDB:', error);
        process.exit(1); // Dừng chương trình nếu kết nối thất bại
    }
};

// Export hàm connectDB theo kiểu ES Module
export default connectDB;
