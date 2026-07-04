import React, { useEffect, useState } from "react";
import api from "../api";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

function SentimentPieChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        api.get("/summary")
            .then((response) => {

                const summary = response.data;

                setData([
                    {
                        name: "Positive",
                        value: summary["Positive Reviews"]
                    },
                    {
                        name: "Negative",
                        value: summary["Negative Reviews"]
                    },
                    {
                        name: "Neutral",
                        value: summary["Neutral Reviews"]
                    }
                ]);

            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const COLORS = ["#00C49F", "#FF4C4C", "#FFBB28"];

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
                Sentiment Distribution
            </h2>

            <PieChart width={500} height={350}>

                <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                >

                    {
                        data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))
                    }

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </div>

    );

}

export default SentimentPieChart;