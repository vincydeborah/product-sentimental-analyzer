import React, { useEffect, useState } from "react";
import api from "../api";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function RatingChart() {

    const [ratings, setRatings] = useState([]);

    useEffect(() => {

        api.get("/ratings")
            .then((response) => {
                setRatings(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (

        <div
            style={{
                background: "white",
                marginTop: "30px",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.2)"
            }}
        >

            <h2 style={{ textAlign: "center" }}>
                Rating Distribution
            </h2>

            <ResponsiveContainer width="100%" height={350}>

                <BarChart data={ratings}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="rating" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#4CAF50"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default RatingChart;