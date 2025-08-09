import { Layout, Button, Space } from "antd";
import { Outlet, Link } from "react-router-dom";

const { Header, Footer, Content } = Layout;

function ClientLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* header */}
      <Header
        style={{
          background: "#fff",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ margin: 0 }}>BÀI ASS1</p>

        <Space>
          <Button type="primary">
            <Link to="/login" style={{ color: "white" }}>
              Đăng nhập
            </Link>
          </Button>
          <Button>
            <Link to="/register">Đăng ký</Link>
          </Button>
        </Space>
      </Header>
      <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
        {/* outlet: đánh dấu phần nội dung page thay đổi */}
        <Outlet />
      </Content>
      <Footer
        style={{ background: "#fff", padding: "0 20px", textAlign: "center" }}
      >
        <p>WD20105 - Frontend Framework 2</p>
        <p>FPoly</p>
      </Footer>
    </Layout>
  );
}

export default ClientLayout;
