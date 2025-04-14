import React, { useEffect, useState } from "react";
import axios from "axios";
import "../common.css";
import "./newcleaner.css";

interface InductionRecord {
    cleaner: string;
    type: string;
    client: string | null;
    refNumber: string;
    startDate: number | null;
    expiryDate: number | null;
    fileUrl: string | null;
}

const CleanerInductionV1Page: React.FC = () => {
    const [inductionData, setInductionData] = useState<InductionRecord[]>([]);

    useEffect(() => {
        axios.get<InductionRecord[]>("http://localhost:4000/induction")
            .then((response) => {
                setInductionData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching induction data:", error);
            });
    }, []);

    const formatDate = (timestamp: number | null): string => {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="container">
            <h1 className="page-title">Cleaner Induction Records</h1>
            <p className="subtext">This is the CleanerInductionV1 page.</p>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Cleaner</th>
                        <th>Induction Type</th>
                        <th>Client</th>
                        <th>Reference Number</th>
                        <th>Start Date</th>
                        <th>Expiry Date</th>
                        <th>File</th>
                    </tr>
                </thead>
                <tbody>
                    {inductionData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.cleaner}</td>
                            <td>{item.type}</td>
                            <td>{item.client || "-"}</td>
                            <td>{item.refNumber}</td>
                            <td>{formatDate(item.startDate)}</td>
                            <td>{formatDate(item.expiryDate)}</td>
                            <td>
                                {item.fileUrl ? (
                                    <a 
                                        href={item.fileUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="file-link"
                                    >
                                        View File
                                    </a>
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CleanerInductionV1Page;