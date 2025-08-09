import { Button, Form, Input, InputNumber } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDetail, updateProduct } from "../../providers/product";

function EditProduct() {
  const { id } = useParams(); // lấy ID từ url
  const [form] = Form.useForm();
  const nav = useNavigate();

  // Lấy chi tiết sản phẩm với queryKey có id và gọi đúng tham số
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getDetail("products", id),
    enabled: !!id,
  });

  // Gán dữ liệu cũ vào form khi product có dữ liệu
  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product]);

  // Cập nhật sản phẩm
  const { mutate } = useMutation({
    mutationFn: (values) => updateProduct("products", id, values),
    onSuccess: () => {
      alert("Cập nhật thành công");
      nav("/admin/products");
    },
    onError: () => {
      alert("Có lỗi xảy ra khi cập nhật");
    },
  });

  function onFinish(values) {
    mutate(values);
  }

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Có lỗi xảy ra khi tải dữ liệu.</p>;

  return (
    <div>
      <h1>Đây là trang edit</h1>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          price: 0, // Sửa lại initialValues đúng định dạng
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Name is required!" },
            { min: 3, message: "Name phải dài hơn 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Image is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Price is required" },
            {
              type: "number",
              min: 0,
              message: "Price phải lớn hơn hoặc bằng 0",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label={null} wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditProduct;
