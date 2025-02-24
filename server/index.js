import express from 'express';
import connectDB from './src/config/db.js'; // Cần thêm `.js`
import cors from 'cors';
import productRouter from './src/routes/productRoutes.js';
import forgot from './src/routes/authRoutes.js';
import authRouter from './src/routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(express.json()); // Giúp Express hiểu dữ liệu JSON từ client
app.use(cors()); // Kích hoạt CORS cho frontend gọi API từ domain khác

app.use('/api/products',productRouter);
app.use('/api/auth', authRouter);



app.listen(PORT, () => {
  console.log(`Server chạy trên cổng ${PORT}`);
});
