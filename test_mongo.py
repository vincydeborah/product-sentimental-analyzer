from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")

db = client["product_sentiment_db"]
collection = db["reviews"]

print("Connected Successfully!")
print("Total Reviews:", collection.count_documents({}))