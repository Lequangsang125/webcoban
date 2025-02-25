import axios from "axios";

const API_URL = "http://localhost:3000/api/products"; // Thay bằng API của bạn

export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Dữ liệu từ API:", response.data); // Kiểm tra dữ liệu nhận được
        return response.data.data; // Lấy mảng sản phẩm trong object
    } catch (error) {
        console.error("Lỗi gọi API:", error);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
};
