import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// @ts-ignore
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Dashboard from "./Misc/Dashboard"; // Create this page
import LiveStats from "./Misc/livestats";
import SidebarLayout from "./sidebar/SidebarLayout";
import ChangeCleanerPage from "./Cleaners/ChangeCleaner";
import NewCleanerChangeForm from "./Cleaners/CleanerForm";
import ViewOnScreenPage from "./Operations/ViewOnScreen";
import PeopleIdPage from "./Cleaners/peopleidpage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/livestats" element={<LiveStats />} />
                <Route path="/layout/*" element={<SidebarLayout />} />
                <Route path="/change-cleaner" element={<ChangeCleanerPage />} />
                <Route path="/status-screen" element={<ViewOnScreenPage/>} />
                <Route path="/change-cleaner/new" element={<NewCleanerChangeForm />} />
                  <Route path="cleaner/:cleanerId" element={<PeopleIdPage />} />
            </Routes>
        </Router>
    );
}

export default App;

