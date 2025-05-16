import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaChartBar, FaUser, FaUsers, FaBriefcase, FaSignOutAlt, FaPlus, FaMinus, FaBuilding, FaUserFriends, FaShoppingCart, FaCheckCircle, FaDatabase } from "react-icons/fa";
import { MdWork, MdOutlineAssignment } from "react-icons/md";
import "./Sidebar.css";
import { JSX } from "react/jsx-runtime";

// Define the structure of a menu item
interface SubMenuItem {
  label: string;
  path: string;
  icon?: JSX.Element;
}

interface MenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
  hasSubmenu: boolean;
  subItems?: SubMenuItem[];
}

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();

  const toggleSection = (section: string) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Function to check if any submenu item is active
  const isSubmenuActive = (subItems: SubMenuItem[] | undefined) => {
    if (!subItems) return false;
    return subItems.some(subItem => location.pathname === subItem.path);
  };

  const menuItems: MenuItem[] = [
    { 
      label: "My Profile", 
      path: "/layout/profile", 
      icon: <FaUser />, 
      hasSubmenu: true, 
      subItems: [
        { label: "Change Password", path: "/layout/ChangePassword", icon: <MdOutlineAssignment /> },
      ]
    },
    { 
      label: "My Clients & Sites", 
      path: "/layout/MyClients&SitesV1", 
      icon: <FaBuilding />, 
      hasSubmenu: false 
    },
    { 
      label: "My Cleaners", 
      path: "/layout/MyCleaners", 
      icon: <FaUserFriends />, 
      hasSubmenu: true, 
      subItems: [
        { label: "Cleaner Admin", path: "/layout/CleanerAdminV1", icon: <MdWork /> },
        { label: "Cleaner Certificates", path: "/layout/CleanerCertificateV1", icon: <MdWork /> },
        { label: "Cleaner Induction", path: "/layout/CleanerInductionV1", icon: <MdWork /> },
      ]
    },
    { 
      label: "Orders", 
      path: "/layout/Orders", 
      icon: <FaShoppingCart />, 
      hasSubmenu: true, 
      subItems: [
        { label: "Periodical Work Orders", path: "/layout/PeriodicalWorkOrdersV1" },
        { label: "Complaint Work Orders", path: "/layout/ComplaintWorkOrdersV1" },
        { label: "All Work Orders", path: "/layout/AllWorkOrdersV1" },
        { label: "Work Order Dashboard", path: "/layout/WorkOrderDashboard" },
      ]
    },
    { 
      label: "Operations", 
      path: "/layout/Operations", 
      icon: <FaCheckCircle />, 
      hasSubmenu: true, 
      subItems: [
        { label: "CleanTrak Real-time Data V2", path: "/layout/CleanTrakRealtimeDataV2", icon: <MdWork /> },
        { label: "Time On Site V1", path: "/layout/TimeOnSiteV1", icon: <MdOutlineAssignment /> },
        { label: "Time On Site Progress", path: "/layout/TimeOnSiteProgress", icon: <MdOutlineAssignment /> },
        { label: "Daily Clean Report V1", path: "/layout/DailyCleanReportV1", icon: <MdOutlineAssignment /> },
        { label: "Operations KPI V1", path: "/layout/OperationsKPIV1", icon: <MdOutlineAssignment /> },
        { label: "Toolbox Talk Report V1", path: "/layout/ToolBoxTalkReport", icon: <MdOutlineAssignment /> },
        { label: "Waste Management V1", path: "/layout/WasteManagement", icon: <MdOutlineAssignment /> },
        { label: "Sub-site Clean Template", path: "/layout/SubSiteCleanTemplate", icon: <MdOutlineAssignment /> },
        { label: "Sub-site Daily Clean Shift", path: "/layout/SubSiteDailyCleanShift", icon: <MdOutlineAssignment /> },
        { label: "Sub-site Daily Clean Data", path: "/layout/SubSiteDailyCleanDataPage", icon: <MdOutlineAssignment /> },
      ]
    },
    { 
      label: "Config Data", 
      path: "/layout/ConfigData", 
      icon: <FaDatabase />, 
      hasSubmenu: true, 
      subItems: [
        { label: "Client Site Data", path: "/layout/ConfigSiteClientData" },
        { label: "Configure Cleaners", path: "/layout/CleanersListPage" },
        { label: "Create New Workorder", path: "/layout/Createworkorderpage" },
        { label: "Change Cleaner", path: "/layout/ChangeCleaner"},
        { label: "Create Schedule", path: "/layout/AddScheduleForm"},
      ]
    },
    { 
      label: "Logout", 
      path: "/layout/Logout", 
      icon: <FaSignOutAlt />, 
      hasSubmenu: false 
    },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title"></h2>
      <ul>
        {menuItems.map((item, index) => {
          const submenuActive = isSubmenuActive(item.subItems);
          return (
            <li key={index}>
              <div className={`sidebar-header ${expanded[item.label] ? "active" : ""}`}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexGrow: 1 }}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      `sidebar-link ${isActive || submenuActive ? "active" : ""}`
                    }
                  >
                    {item.icon} <label>{item.label}</label>
                  </NavLink>
                </div>
                {item.hasSubmenu && (
                  <label
                    className="toggle-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection(item.label);
                    }}
                  >
                    {expanded[item.label] ? <FaMinus /> : <FaPlus />}
                  </label>
                )}
              </div>
              {item.hasSubmenu && expanded[item.label] && (
                <ul className="sidebar-submenu">
                  {item.subItems?.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink
                        to={subItem.path}
                        className={({ isActive }) =>
                          `submenu-link ${isActive ? 'active' : ''}`
                        }
                      >
                        {subItem.icon} {subItem.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;