import axios from "axios";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged) {
      return Swal.fire({
        title: "Bạn chưa đăng nhập",
        text: "Đăng nhập để tiếp tục mua hàng.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }
    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      Swal.fire({
        title: "Sản phẩm này đã được thêm vào giỏ hàng.",
        icon: "question",
      });
    }
  };

  return {
    //     // xác định trạng thái đăng nhập của người dùng.

    isLogged: [isLogged, setIsLogged],
    // xác định vai trò của người dùng (admin hoặc không phải).
    isAdmin: [isAdmin, setIsAdmin],
    // để lưu trữ danh sách sản phẩm trong giỏ hàng của người dùng
    cart: [cart, setCart],
    addCart: addCart,
    // để lưu trữ lịch sử mua hàng của người dùng.

    history: [history, setHistory],
  };
}

export default UserAPI;
