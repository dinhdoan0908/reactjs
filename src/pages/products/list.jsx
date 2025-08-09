import { Table, Image, Button, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getList, deleteProduct } from "../../providers/product";

function ListProduct() {
  // const queryClient = useQueryClient();
  // Lấy dữ liệu
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getList({ resource: "products" }),
  });
  // XÓA

  const mutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      message.success("Xóa thành công");
      // queryClient.invalidateQueries(["products"]);
      refetch();
    },
    onError: () => {
      message.error("Xóa thất bại");
    },
  });
  const handleDelete = (id) => {
    mutation.mutate(id);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <Image src={image} />;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      render: (product) => {
        return (
          <>
            <Button>
              <Link to={`/admin/products/${product.id}/edit`}>Edit</Link>
            </Button>

            <Popconfirm
              title="Delete the task"
              description="Bạn có chắc không?"
              onConfirm={() => handleDelete(product.id)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <h1>Đây là trang danh sách</h1>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  );
}

export default ListProduct;
