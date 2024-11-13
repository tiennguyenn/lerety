import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Main from "./pages/Main";
import ProductsPage from "./pages/ProductsPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
    ],
  },
]);

export function Router() {
  return (
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
  );
}
