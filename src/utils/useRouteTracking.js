// src/utils/useRouteTracking.js
// Hook theo dõi đổi route (react-router) -> bắn pageview. Không render gì.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageview } from "./tracker";

export default function useRouteTracking() {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPageview(pathname); // chỉ pathname, bỏ query/hash
  }, [pathname]);
}
