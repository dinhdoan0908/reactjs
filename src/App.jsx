import { useRoutes } from "react-router"; //sử dụng useRoutes để điều hướng
import MainLayout from "./layouts/main";
import ListProduct from "./pages/products/list";
import Homepage from "./pages/home";
import CreateProduct from "./pages/products/create";
import ClientLayout from "./layouts/client";

import "./App.css";
import ProductDetail from "./pages/ProductDetail";
import EditProduct from "./pages/products/edit";
import Login from "./pages/products/Login";
import Register from "./pages/products/Register";

function App() {
  const routes = useRoutes([
    {
      //trang admin
      path: "/admin", //đường dẫn
      element: <MainLayout />, //sử dụng mainlayout cho màn admin
      children: [
        {
          path: "products", //url: /admin/products
          element: <ListProduct />,
        },
        {
          path: "products/create",
          element: <CreateProduct />,
        },
        {
          path: "products/:id/edit",
          element: <EditProduct />,
        },
      ],
    },
    {
      //trang client
      path: "",
      element: <ClientLayout />,
      children: [
        {
          path: "",
          element: <Homepage />,
        },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
  ]);

  return <div style={{ width: "100vw" }}>{routes}</div>;
}

export default App;
