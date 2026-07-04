import React, { useEffect, useState } from "react";
import api from "../api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function WordFrequency() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    api
      .get("/wordfrequency")
      .then((response) => {
        setWords(response.data);
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
        boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Most Frequent Words
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={words}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="word" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WordFrequency;