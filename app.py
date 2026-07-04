from flask import Flask, jsonify, request
from collections import Counter
import re
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["product_sentiment_db"]
collection = db["reviews"]

# Home Page
@app.route("/")
def home():
    return jsonify({
        "message": "Product Sentiment Analysis API Running"
    })


# Summary API
@app.route("/summary")
def summary():
    total = collection.count_documents({})
    positive = collection.count_documents({"Sentiment": "Positive"})
    negative = collection.count_documents({"Sentiment": "Negative"})
    neutral = collection.count_documents({"Sentiment": "Neutral"})

    return jsonify({
        "Total Reviews": total,
        "Positive Reviews": positive,
        "Negative Reviews": negative,
        "Neutral Reviews": neutral
    })


# Show all reviews
@app.route("/reviews")
def reviews():
    data = list(collection.find({}, {"_id": 0}))
    return jsonify(data)


# Search reviews
@app.route("/search")
def search():

    product = request.args.get("product", "")

    data = list(collection.find(
        {"Product": {"$regex": product, "$options": "i"}},
        {"_id": 0}
    ))

    return jsonify(data)


# Rating Distribution
@app.route("/ratings")
def ratings():

    result = []

    for i in range(1, 6):

        count = collection.count_documents({"Rating": i})

        result.append({
            "rating": f"{i} Star",
            "count": count
        })

    return jsonify(result)


# Word Frequency
@app.route("/wordfrequency")
def wordfrequency():

    data = collection.find({}, {"Review": 1, "_id": 0})

    words = []

    stop_words = {
        "the", "is", "and", "to", "of", "it", "this", "very",
        "for", "a", "i", "my", "in", "with", "on", "was",
        "are", "have", "phone", "product", "good"
    }

    for item in data:

        review = item.get("Review", "").lower()

        review = re.sub(r"[^a-zA-Z ]", "", review)

        review_words = review.split()

        for word in review_words:

            if len(word) > 2 and word not in stop_words:

                words.append(word)

    counter = Counter(words)

    result = []

    for word, count in counter.most_common(10):

        result.append({
            "word": word,
            "count": count
        })

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)