import spacy
from transformers import pipeline
import re
import nltk
from nltk.corpus import stopwords

def download_models():
    try:
        stopwords.words("english")
    except LookupError:
        print("Downloading NLTK stopwords...")
        nltk.download("stopwords")

    try:
        spacy.load("en_core_web_sm")
    except OSError:
        print("Downloading spaCy model 'en_core_web_sm'...")
        from spacy.cli import download
        download("en_core_web_sm")

HAZARD_KEYWORDS = {
    "Tsunami": ["tsunami", "tidal wave"],
    "Storm Surge": ["storm surge", "surge", "coastal flood"],
    "High Waves": ["high waves", "rough seas", "big waves", "strong waves"],
    "Swell Surge": ["swell surge", "high tide", "abnormal tide"],
    "Coastal Currents": ["rip current", "strong current", "undertow"],
    "Flooding": ["flooding", "water logging", "inundation", "submerged"],
    "Coastal Damage": ["erosion", "damaged coast", "collapsed", "damage"],
}

class NLPProcessor:
    def __init__(self):
        download_models()
        print("Loading NLP models...")
        self.sentiment_pipeline = pipeline(
            "sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest"
        )
        self.nlp = spacy.load("en_core_web_sm")
        print("NLP models loaded successfully.")

    def _preprocess_text(self, text: str) -> str:
        text = re.sub(r"http\S+", "", text)
        text = re.sub(r"@[A-Za-z0-9]+", "", text)
        text = re.sub(r"#[A-Za-z0-9]+", "", text)
        text = re.sub(r"[^A-Za-z0-9\s]", "", text)
        return text.lower().strip()

    def process(self, text: str) -> dict:
        if not text or not isinstance(text, str):
            return {"error": "Input text must be a non-empty string."}

        sentiment_result = self.sentiment_pipeline(text)[0]
        sentiment = {"label": sentiment_result["label"], "score": round(sentiment_result["score"], 4)}

        clean_text = self._preprocess_text(text)
        detected_hazards = set()
        keywords_found = set()
        for hazard, keywords in HAZARD_KEYWORDS.items():
            for keyword in keywords:
                if re.search(r'\b' + re.escape(keyword) + r'\b', clean_text):
                    detected_hazards.add(hazard)
                    keywords_found.add(keyword)
        
        hazard_classification = {
            "detected_hazards": list(detected_hazards),
            "keywords_found": list(keywords_found),
        }

        doc = self.nlp(text)
        locations = list(set([ent.text for ent in doc.ents if ent.label_ in ["GPE", "LOC"]]))

        return {
            "original_text": text,
            "sentiment": sentiment,
            "hazard_classification": hazard_classification,
            "extracted_locations": locations,
        }