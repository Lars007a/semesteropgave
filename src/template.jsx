import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./template.module.css";
import { useRoutes } from "react-router-dom";
import Frontpage from "./pages/frontpage/frontpage.jsx";
import Faqpage from "./pages/faq/faq.jsx";
import CustomerClub from "./pages/customerClub/customerClub.jsx";
import ProductsPage from "./pages/products/products.jsx";

function App() {
  let pagesRoute = useRoutes(
    {
      path: "/",
      element: <Frontpage />,
    },
    {
      path: "/faq",
      element: <Faqpage />,
    },
    {
      path: "/club",
      element: <CustomerClub />,
    },
    {
      path: "/products",
      element: <ProductsPage />,
    }
  );

  return <>{pagesRoute}</>;
}

export default App;
