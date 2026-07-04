import React, { useEffect, useState } from "react";
import api from "../api";

function Summary() {

    const [summary, setSummary] = useState({});

    useEffect(() => {

        api.get("/summary")
            .then((response) => {
                setSummary(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (

        <div className="summary-grid">

            <div className="summary-card">
                <h2>Total Reviews</h2>
                <p>{summary["Total Reviews"]}</p>
            </div>

            <div className="summary-card">
                <h2>Positive Reviews</h2>
                <p>{summary["Positive Reviews"]}</p>
            </div>

            <div className="summary-card">
                <h2>Negative Reviews</h2>
                <p>{summary["Negative Reviews"]}</p>
            </div>

            <div className="summary-card">
                <h2>Neutral Reviews</h2>
                <p>{summary["Neutral Reviews"]}</p>
            </div>

        </div>

    );

}

export default Summary;