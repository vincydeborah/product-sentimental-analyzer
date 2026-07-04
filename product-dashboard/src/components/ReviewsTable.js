import React, { useEffect, useState } from "react";
import api from "../api";

function ReviewsTable() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        api.get("/reviews")
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (

        <div
            style={{
                marginTop: "40px",
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.2)"
            }}
        >

            <h2>Recent Reviews</h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>

                        <th>Product</th>
                        <th>Review</th>
                        <th>Sentiment</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        reviews.map((item, index) => (

                            <tr key={index}>

                                <td>{item.Product}</td>

                                <td>{item.Review}</td>

                                <td>{item.Sentiment}</td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default ReviewsTable;