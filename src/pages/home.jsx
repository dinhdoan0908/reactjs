import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Typography,
  Divider,
  Pagination,
  Card,
  Empty,
} from "antd";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

function Homepage() {
  const [allProducts, setAllProducts] = useState([]);

  const getListProduct = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/allProduct");
      setAllProducts(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getListProduct();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // --- FILTERED PRODUCT LIST
  const filteredProducts = allProducts
    .filter((p) => p.name?.toLowerCase().includes(searchTerm.toLowerCase()))

    .filter((p) => {
      if (priceFilter === "all") return true;
      if (priceFilter === "low") return p.price <= 2000000;
      if (priceFilter === "mid") return p.price > 2000000 && p.price <= 5000000;
      if (priceFilter === "high") return p.price > 5000000;
      return true;
    });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ padding: "30px 50px", backgroundColor: "#f5f5f5" }}>
      <Card style={{ padding: "20px", borderRadius: "12px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
          WEBSITE
        </Title>

        {/* FILTER BAR */}
        <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder=" Search product..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              allowClear
              size="large"
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              size="large"
              style={{ width: "100%" }}
              value={priceFilter}
              onChange={(value) => {
                setPriceFilter(value);
                setCurrentPage(1);
              }}
            >
              <Option value="all">Tất cả</Option>
              <Option value="low">Dưới 2000000</Option>
              <Option value="mid">2000000 - 5000000</Option>
              <Option value="high">Trên 5000000</Option>
            </Select>
          </Col>
        </Row>

        <Divider />

        {/* PRODUCT GRID */}
        <Row gutter={[24, 24]} justify="start">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((p) => (
              <Col xs={24} sm={12} md={8} lg={8} key={p.id}>
                <ProductCard product={p} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Empty description="No products found" />
            </Col>
          )}
        </Row>

        {/* PAGINATION */}
        <Row justify="center" style={{ marginTop: 40 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredProducts.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </Row>
      </Card>
    </div>
  );
}

export default Homepage;
