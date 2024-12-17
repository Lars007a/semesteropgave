import "./template.module.css";
import { useRoutes } from "react-router-dom";
import Frontpage from "./pages/frontpage/frontpage.jsx";
import Faqpage from "./pages/faq/faq.jsx";
import CustomerClub from "./pages/customerClub/customerClub.jsx";
import ProductsPage from "./pages/products/products.jsx";
import Navbar from "./comps/navbar/navbar.jsx";
import Footer from "./comps/footer/footer.jsx";
import Topbanner from "./comps/topbanner/topbanner.jsx";

function App() {
  let pagesRoute = useRoutes([
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
    },
  ]);

  return (
    <>
    <Topbanner/>
      <Navbar />
      {pagesRoute}
      <Footer/>
    </>
  );
}

export default App;
