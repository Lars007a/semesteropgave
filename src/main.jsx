import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./template.jsx";
import { BrowserRouter } from "react-router-dom";

/* render bare template komponentet (app) */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
