import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles.css";
import { router } from "./router";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing root element");
}

createRoot(rootElement).render(<RouterProvider router={router} />);
