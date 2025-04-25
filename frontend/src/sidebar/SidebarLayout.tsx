import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import LiveStats from "../Misc/livestats";
import ProfilePage from "../Profile/Profile";
import ChangePasswordPage from "../Profile/ChangePassword";
import ClientssitesV1Page from "../MyClients&Sites/MyClients&SitesV1";
import MyCleanersPage from "../Cleaners/MyCleaners";
import CleanerAdminV1Page from "../Cleaners/CleanerAdminV1";
import CleanerCertificateV1Page from "../Cleaners/CleanerCertificateV1";
import CleanerInductionV1Page from "../Cleaners/CleanerInductionV1";
import ChangeCleanerPage from "../Cleaners/ChangeCleaner";
import OrdersPage from "../Orders/Orders";
import PeriodicalWorkOrdersV1Page from "../Orders/PeriodicalWorkOrdersV1";
import ComplaintWorkOrdersV1Page from "../Orders/ComplaintWorkOrdersV1";
import AllWorkOrdersV1Page from "../Orders/AllWorkOrdersV1";
import WorkOrderDashboardPage from "../Orders/AllWorkOrdersV1";
import OperationsPage from "../Operations/Operations";
import CleanTrakRealtimeDataV2Page from "../Operations/CleanTrakRealtimeDataV2";
import TimeOnSiteV1Page from "../Operations/TimeOnSiteV1";
import TimeOnSiteProgressPage from "../Operations/TimeOnSiteProgress";
import DailyCleanReportV1Page  from "../Operations/DailyCleanReportV1";
import OperationsKPIV1Page  from "../Operations/OperationsKPIV1";
import ToolBoxTalkReportPage from "../Operations/ToolBoxTalkReport";
import WasteManagementPage from "../Operations/WasteManagement";
import SubSiteCleanTemplatePage from "../Operations/SubSiteCleanTemplate";
import SubSiteDailyCleanShiftPage  from "../Operations/SubSiteDailyCleanShift";
import SubSiteDailyCleanDataPage from "../Operations/SubSiteDailyCleanData";
import LogoutPage from "../authentication/Logout";
import NewCleanerChangePage from "../Cleaners/CleanerForm";
import "./SidebarLayout.css";
import ConfigSiteClientData from "../config/site_client";
import CleanerConfigPage from "../config/configure_cleaner";
import CleanersListPage from "../config/managecleanerconfig";

const SidebarLayout = () => {
    return (
        <div className="layout-container">
            {/* Sidebar */}
            <Sidebar />

            {/* Dynamic Content Area */}
            <div className="content">
                <Routes>
                    <Route path="livestats" element={<LiveStats />} />                   
                    <Route path="Profile" element={<ProfilePage />} />
                    <Route path="ChangePassword" element={<ChangePasswordPage />} />
                    <Route path="MyClients&SitesV1" element={<ClientssitesV1Page />} />
                    <Route path="MyCleaners" element={<MyCleanersPage />} />
                    <Route path="CleanerAdminV1" element={<CleanerAdminV1Page />} />
                    <Route path="CleanerCertificateV1" element={<CleanerCertificateV1Page />} />
                    <Route path="CleanerInductionV1" element={<CleanerInductionV1Page />} />
                    <Route path="ChangeCleaner" element={<ChangeCleanerPage />} />
                    <Route path="Orders" element={<OrdersPage />} />
                    <Route path="PeriodicalWorkOrdersV1" element={<PeriodicalWorkOrdersV1Page />} />
                    <Route path="ComplaintWorkOrdersV1" element={<ComplaintWorkOrdersV1Page />} />
                    <Route path="AllWorkOrdersV1" element={<AllWorkOrdersV1Page />} />
                    <Route path="WorkOrderDashboard" element={<WorkOrderDashboardPage />} />
                    <Route path="Operations" element={<OperationsPage />} />
                    <Route path="CleanTrakRealtimeDataV2" element={<CleanTrakRealtimeDataV2Page />} />
                    <Route path="TimeOnSiteV1" element={<TimeOnSiteV1Page />} />
                    <Route path="TimeOnSiteProgress" element={<TimeOnSiteProgressPage />} />
                    <Route path="DailyCleanReportV1" element={<DailyCleanReportV1Page />} />
                    <Route path="OperationsKPIV1" element={<OperationsKPIV1Page />} />
                    <Route path="ToolBoxTalkReport" element={<ToolBoxTalkReportPage />} />
                    <Route path="WasteManagement" element={<WasteManagementPage />} />
                    <Route path="SubSiteCleanTemplate" element={<SubSiteCleanTemplatePage />} />
                    <Route path="SubSiteDailyCleanShift" element={<SubSiteDailyCleanShiftPage />} />
                    <Route path="SubSiteDailyCleanDataPage" element={<SubSiteDailyCleanDataPage />} />
                    <Route path="Logout" element={<LogoutPage />} />
                    <Route path="NewCleanerChange" element={<NewCleanerChangePage />} />
                    <Route path="ConfigSiteClientData" element={<ConfigSiteClientData />} />
                    <Route path="CleanersListPage" element={<CleanersListPage/>}/>
                    <Route path="CleanerConfigPage" element={<CleanerConfigPage/>}/>
                    <Route path="CleanerConfigPage/:peopleid" element={<CleanerConfigPage />} />




                </Routes>

                {/* Default Page */}
                <Outlet />
            </div>
        </div>
    );
};

export default SidebarLayout;
