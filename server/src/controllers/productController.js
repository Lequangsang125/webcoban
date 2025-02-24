import Product from "../models/Product.js";

// Lấy danh sách sản phẩm
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length > 0) {
            return res.status(200).json({
                message: "Thành công",
                data: products
            });
        }
        return res.status(404).json({
            message: "Dữ liệu trống"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Tạo sản phẩm mới
export const createProduct = async (req, res) => {
    try {
        const { name, price, category, quantity } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({
                message: "Không được để trống dữ liệu"
            });
        }
        const savedProduct = await Product.create({
            name,
            price,
            category,
            quantity
        });
        return res.status(200).json({
            message: "Tạo sản phẩm thành công",
            data: savedProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });
        }
        res.json(product);
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
        return res.status(200).json({
            message: "Cập nhật thành công",
            data: updatedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi cập nhật"
        });
    }
};

// Xóa sản phẩm
export const removeProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });
        }  res.status(200).json({
            message: "Xóa thành công"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi khi xóa"
        });
    }
};
