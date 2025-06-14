import "./template.css";
import { useRoutes } from "react-router-dom";
import Frontpage from "./pages/frontpage/frontpage.jsx";
import Faqpage from "./pages/faq/faq.jsx";
import CustomerClub from "./pages/customerClub/customerClub.jsx";
import ProductsPage from "./pages/products/products.jsx";
import Navbar from "./comps/navbar/navbar.jsx";
import Footer from "./comps/footer/footer.jsx";
import Topbanner from "./comps/topbanner/topbanner.jsx";

/* template komponentet for alle sider. Sørger for der er nav bar, topbanner, og footer på alle sider. Og et bestemt stylesheet også. */

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
      <Topbanner />
      <Navbar />
      {pagesRoute}
      <Footer />
    </>
  );
}

export default App;
