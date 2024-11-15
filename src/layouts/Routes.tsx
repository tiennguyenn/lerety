import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductPage";
import ContactPage, { contactAction } from "../pages/ContactPage";
import ThankYouPage from "../pages/ThankYouPage";
import PostsPage from "../pages/PostsPage";
import PostPage from "../pages/PostPage";
import GitHubPage from "../pages/github/GitHubPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
      {
        path: "/posts",
        element: <PostsPage />,
      },
      {
        path: "/post/:id",
        element: <PostPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
        action: contactAction,
      },
      {
        path: "thank-you/:name",
        element: <ThankYouPage />,
      },
      {
        path: "github",
        element: <GitHubPage />,
      },
    ],
  },
]);

export function Routes() {
  return (
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
  );
}
