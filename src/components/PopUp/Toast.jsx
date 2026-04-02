import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      } else {
        toast(message);
      }

      // Auto close after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, type, onClose]);

  return null;
}
