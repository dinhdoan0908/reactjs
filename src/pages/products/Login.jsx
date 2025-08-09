import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const nav = useNavigate();

  const loginUser = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email: data.email,
        password: data.password,
      });
      message.success("Đăng nhập thành công!");
      alert("Đăng nhập thành công!");
      // // Lưu token vào localStorage (nếu muốn)
      // localStorage.setItem("token", res.data.accessToken);
      nav("/admin/products");
    } catch (error) {
      message.error("Đăng nhập thất bại! Vui lòng thử lại.");
      console.error(error.response?.data || error.message);
    }
  };

  function onFinish(values) {
    loginUser(values);
  }

  return (
    <Form
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email!" },
          { type: "email", message: "Email không hợp lệ!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
