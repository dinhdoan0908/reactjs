import { useState } from "react";

function BuyProduct() {
  //KHÔNG SỬ DỤNG STATE
  // let count = 0;
  // const handleClick = () => {
  //     count = count + 1;
  //     console.log(count);
  // };

  //khởi tạo useState để lưu trữ biến count và cập nhật khi có thay đổi
  //const [tenBien, setTenBien] = useState(GiaTriKhoiTaoCuaBien)
  const [count, setCount] = useState(0);
  const handleClick = () => {
    //useState KHÔNG CHO CẬP NHẬT TRỰC TIẾP GIÁ TRỊ CỦA BIẾN
    //bắt buộc phải sử dụng hàm setCount();
    setCount(count + 1);
    console.log(count);
  };

  return (
    <div style={{ textAlign: "center", width: "300px" }}>
      <p>Số lượt bán: {count}</p>
      <button onClick={handleClick}>Buy now</button>
    </div>
  );
}

export default BuyProduct;
