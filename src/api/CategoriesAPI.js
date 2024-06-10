import axios from "axios";
import React, { useEffect, useState } from "react";

function CategoriesAPI() {
  // hook này được sử dụng để lấy danh sách các danh mục sản phẩm từ API
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };

    getCategories();
  }, [callback]);
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
}

export default CategoriesAPI;
