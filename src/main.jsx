import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { captureTrackingData } from "./utils/leadTracking";
import { BrowserRouter } from "react-router-dom";
import "./styles/variables.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
