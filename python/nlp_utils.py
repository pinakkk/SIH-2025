from textblob import TextBlob

def analyze_text(text: str):
    """Lightweight NLP using TextBlob."""
    if not text:
        return {"sentiment": "neutral", "polarity": 0.0}
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    if polarity < -0.2:
        sentiment = "negative"
    elif polarity > 0.2:
        sentiment = "positive"
    else:
        sentiment = "neutral"
    return {"sentiment": sentiment, "polarity": round(polarity, 3)}
