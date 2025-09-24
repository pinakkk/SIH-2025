import spacy

# Load SpaCy NLP model once
try:
    nlp = spacy.load("en_core_web_sm")
except Exception as e:
    nlp = None
    print("⚠️ SpaCy model not loaded. Run: python -m spacy download en_core_web_sm")

def analyze_text(text: str):
    """Extract keywords and simple sentiment from text"""
    if not text:
        return {"error": "No text provided"}

    if nlp is None:
        return {"error": "SpaCy model not available"}

    doc = nlp(text)
    keywords = [token.text for token in doc if token.is_alpha and not token.is_stop]

    # Very basic sentiment (can replace with real ML model later)
    sentiment = "positive" if any(word in text.lower() for word in ["safe", "ok", "calm"]) else "neutral"
    if any(word in text.lower() for word in ["danger", "flood", "tsunami", "alert", "high waves"]):
        sentiment = "negative"

    return {
        "original_text": text,
        "keywords": keywords[:5],
        "sentiment": sentiment
    }
