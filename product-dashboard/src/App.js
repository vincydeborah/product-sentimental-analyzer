import "./App.css";

import Summary from "./components/Summary";
import SentimentPieChart from "./components/PieChart";
import ReviewsTable from "./components/ReviewsTable";
import RatingChart from "./components/RatingChart";
import WordFrequency from "./components/WordFrequency";

function App() {
  return (
    <div className="container">

      <h1 className="title">
        Product Sentiment Dashboard
      </h1>

      <Summary />

      <SentimentPieChart />

      <RatingChart />

      <WordFrequency />

      <ReviewsTable />

      <footer
        style={{
          marginTop: "40px",
          textAlign: "center",
          padding: "20px",
          color: "gray",
        }}
      >
        Developed using Python • Flask • MongoDB • React
        <br />
        Product Sentiment Analyzer © 2026
      </footer>

    </div>
  );
}

export default App;