import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  //   tạo các state variables
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
    };
    getProducts();
  }, [callback, category, sort, search, page]);

  return {
    // lưu trữ danh sách sản phẩm.
    products: [products, setProducts],
    //  cập nhật và ghi đè danh sách sản phẩm khi cần thiết.
    callback: [callback, setCallback],
    //  lưu trữ và cập nhật danh mục sản phẩm được lọc.
    category: [category, setCategory],
    //  lưu trữ và cập nhật cách sắp xếp danh sách sản phẩm.
    sort: [sort, setSort],
    // để lưu trữ và cập nhật từ khóa tìm kiếm.
    search: [search, setSearch],
    //lưu trữ và cập nhật trang hiện tại của danh sách sản phẩm.
    page: [page, setPage],
    // lưu trữ số lượng sản phẩm kết quả.
    result: [result, setResult],
  };
}

export default ProductsAPI;
