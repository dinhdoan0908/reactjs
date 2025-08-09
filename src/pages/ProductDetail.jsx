import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spin } from "antd";

function ProductDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả sử API bạn dùng có endpoint: /allProduct
    axios
      .get(`http://localhost:3000/allProduct`)
      .then((res) => {
        const foundProduct = res.data.find((p) => String(p.id) === id);
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <Spin style={{ display: "block", margin: "100px auto" }} />;
  if (!product) return <p style={{ textAlign: "center" }}>Product not found</p>;

  return (
    <div style={{ padding: "30px 50px" }}>
      <Card
        title={product.name}
        cover={
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
          />
        }
      >
        <p style={{ marginTop: 20 }}>Price: {product.price}</p>
      </Card>
    </div>
  );
}

export default ProductDetail;
