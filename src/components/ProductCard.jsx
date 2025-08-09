import { Card, Button } from "antd";
import BuyProduct from "./BuyProduct";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src={product.image}
            style={{ cursor: "pointer" }}
            onClick={handleImageClick}
          />
        }
      >
        <Meta title={product.name} description={product.price} />
      </Card>
      <BuyProduct />
    </div>
  );
}

export default ProductCard;
