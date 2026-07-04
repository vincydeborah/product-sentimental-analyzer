
import pandas as pd
from textblob import TextBlob

df = pd.read_csv("reviews.csv")

sentiments = []

for review in df["Review"]:

    polarity = TextBlob(str(review)).sentiment.polarity

    if polarity > 0:
        sentiments.append("Positive")

    elif polarity < 0:
        sentiments.append("Negative")

    else:
        sentiments.append("Neutral")

df["Sentiment"] = sentiments

df.to_csv(
    "reviews_with_sentiment.csv",
    index=False
)

print(df.head())
print("\nSentiment Analysis Completed!")