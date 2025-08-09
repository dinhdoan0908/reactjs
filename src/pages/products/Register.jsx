import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const nav = useNavigate();

  const registerUser = async (data) => {
    try {
      // Dùng đúng payload cho json-server-auth: email + password
      await axios.post("http://localhost:3000/register", {
        email: data.email,
        password: data.password,
      });
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      nav("/login");
    } catch (error) {
      message.error("Đăng ký thất bại! Vui lòng thử lại.");
      console.error(error.response?.data || error.message);
    }
  };

  function onFinish(values) {
    registerUser(values);
  }

  return (
    <Form
      name="register"
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
        rules={[
          { required: true, message: "Vui lòng nhập mật khẩu!" },
          { min: 6, message: "Mật khẩu phải dài ít nhất 6 ký tự" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* Bỏ confirm password để đơn giản, nếu muốn thì bạn tự xử lý phía client */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Register;
