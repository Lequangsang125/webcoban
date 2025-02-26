
export const fetchProducts = async() =>{
    const res = await fetch('http://localhost:3000/api/products')
    if(!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
    return res.json();
}