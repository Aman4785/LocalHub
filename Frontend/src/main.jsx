import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Redirect to HashRouter if someone opens a direct route like /signup
if (!window.location.hash && window.location.pathname !== "/") {
  window.location.replace("/#"+window.location.pathname);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
