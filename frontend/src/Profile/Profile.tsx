import React, { useEffect, useState } from "react";
import "../common.css";
import "./profile.css";
import Compliance3DPieChart from "./piechart";
import TimeOnSiteDiscrepancyChart from "./timeonsitechart";
import CleaningStatisticChart from "./cleaningStatsChart";
import SiteDistributionMap from "./cleaningStatsChart";
import RegularCleanSitesMap from "./RegularSiteMap";



const ProfilePage = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedDate = currentTime.toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    const formattedTime = currentTime.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second:"2-digit"
    });

    return (
        <div className="full-container">
            <div className="profile-card">
                <div className="top-info">
                    <div className="datetime"><span className="green-letter"><strong>{formattedDate} · {formattedTime}</strong></span></div>
                    <div className="top-center">P<span className="pink-letter">R</span>ATS</div>
                    <div><span className="blue-letter">Welcome</span><span className="green-letter"> Neeraj Singh</span> </div>
                </div>
                <div className="top-line" />
               
                <div className="chart-container">
                <div className="chart-container">
                    <div className="chart-row">
                       <Compliance3DPieChart/>
                       <TimeOnSiteDiscrepancyChart/>
                       <SiteDistributionMap/>
                       
                    </div>
                    <div className="chart-row">
                    <RegularCleanSitesMap/>
                        
                    </div>
                </div>

</div>

                
               
            </div>
        </div>
    );
};

export default ProfilePage;
