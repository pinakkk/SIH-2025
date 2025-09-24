import spacy

# Load SpaCy NLP model
nlp = spacy.load("en_core_web_sm")

def analyze_text(text: str):
    """
    Extract keywords and simple sentiment from text.
    Later we can replace with transformer models.
    """
    if not text:
        return {"error": "No text provided"}

    doc = nlp(text)
    keywords = [token.text for token in doc if token.is_alpha and not token.is_stop]

    # Very basic sentiment (placeholder)
    sentiment = "positive" if any(word in text.lower() for word in ["safe", "ok", "calm"]) else "neutral"
    if any(word in text.lower() for word in ["danger", "flood", "tsunami", "alert", "high waves"]):
        sentiment = "negative"

    return {
        "original_text": text,
        "keywords": keywords[:5],
        "sentiment": sentiment
    }
