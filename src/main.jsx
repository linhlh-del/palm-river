import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { captureTrackingData } from "./utils/leadTracking";
import { initTracker } from "./utils/tracker";
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

// Tracker analytics: khởi tạo 1 lần SAU khi trang đã render, lúc trình duyệt rảnh
// (không nằm trong đường dẫn tới First Contentful Paint). Lỗi tracker không bao giờ làm hỏng trang.
const startTracker = () => {
  try {
    initTracker();
  } catch {
    /* tracker lỗi thì bỏ qua */
  }
};
if ("requestIdleCallback" in window) {
  window.requestIdleCallback(startTracker, { timeout: 3000 });
} else {
  setTimeout(startTracker, 1500);
}
