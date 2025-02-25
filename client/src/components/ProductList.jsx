// import { useEffect, useState } from "react";
// import { getProducts } from "../api/productApi";

const ProductList = () => {
//   const [products, setProducts] = useState([]);
// console.log("Dữ liệu products nhận được:", products);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getProducts();
//         setProducts(data);
//       } catch (error) {
//         console.error("Lỗi lấy danh sách sản phẩm:", error);
//       }
//     };
const apiProduct = 'http://localhost:3000/api/products'
fetch(apiProduct)
.then(function(response){
    return response.json()
    //JSON.parse: JSON -> JS type
})
.then(function(post){
    console.log(post);
    
})
//     fetchProducts();
//   }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Danh sách sản phẩm</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Tên sản phẩm</th>
            <th className="border px-4 py-2">Giá</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center">
              <td className="border px-4 py-2">{product._id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price} VND</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Sửa</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
