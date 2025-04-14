import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CustomToolbarProps {
  label: string;
  onNavigate: (action: 'PREV' | 'NEXT') => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ label, onNavigate }) => {
  return (
    <div className="custom-toolbar">
      <button className="nav-button" onClick={() => onNavigate("PREV")}>
        <FaChevronLeft />
      </button>
      <span className="toolbar-label">{label}</span>
      <button className="nav-button" onClick={() => onNavigate("NEXT")}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CustomToolbar;
