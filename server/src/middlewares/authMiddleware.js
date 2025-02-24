import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Lấy token từ header

    if (!token) {
        return res.status(401).json({ message: "Không có token, truy cập bị từ chối" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Gán thông tin user vào req để sử dụng sau này
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token không hợp lệ" });
    }
};
