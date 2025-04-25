import React, { useEffect, useState } from "react";
import "./alert.css";

interface AlertProps {
  type?: "success" | "error" | "warning";
  message: string;
  duration?: number;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({
  type = "success",
  message,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`custom-alert ${type}`}>
      <div className="custom-alert-message">{message}</div>
    </div>
  );
};

export default Alert;
