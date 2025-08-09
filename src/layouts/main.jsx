import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ProductOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const { Header, Sider, Footer, Content } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function MainLayout() {
  const navigate = useNavigate();
  const items = [
    getItem("Home", "/admin", <HomeOutlined />),
    getItem("Products", "products", <ProductOutlined />, [
      getItem("List", "/admin/products", <UnorderedListOutlined />),
      getItem("Create", "/admin/products/create", <PlusOutlined />),
    ]),
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* sidebar */}
      <Sider collapsible>
        <div style={{ color: "white", textAlign: "center", padding: 10 }}>
          WEBSITE
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          onClick={({ key }) => {
            navigate(key); // chuyển hướng theo key (URL)
          }}
        />
      </Sider>

      <Layout>
        {/* header */}
        <Header
          style={{ background: "#fff", padding: "0 20px", textAlign: "right" }}
        >
          <p>Username</p>
        </Header>
        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          {/* outlet: đánh dấu phần nội dung page thay đổi */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
