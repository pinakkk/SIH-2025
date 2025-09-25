import datetime
from nlp_utils import analyze_text

# Hazard severity weights
HAZARD_WEIGHTS = {
    "tsunami": 5,
    "storm surge": 4,
    "flood": 4,
    "high waves": 3,
    "swell": 2,
    "fire": 1
}

def rank_posts(posts):
    """Rank hazard posts based on severity, recency, verification, sentiment."""
    ranked = []
    now = datetime.datetime.utcnow()

    for post in posts:
        caption = post.get("caption", "")
        hazard_type = post.get("hazardType", "unknown").lower()
        verified = post.get("verified", False)
        created_at = post.get("createdAt")

        # NLP
        nlp_result = analyze_text(caption)
        sentiment = nlp_result.get("sentiment", "neutral")

        hazard_score = HAZARD_WEIGHTS.get(hazard_type, 1)

        # Recency decay
        recency_score = 0
        if created_at:
            try:
                post_time = datetime.datetime.fromisoformat(created_at.replace("Z", "+00:00"))
                hours_old = (now - post_time).total_seconds() / 3600
                recency_score = max(0, 5 - (hours_old / 2))
            except:
                recency_score = 1

        verified_bonus = 2 if verified else 0
        sentiment_score = 2 if sentiment == "negative" else (1 if sentiment == "neutral" else 0)

        score = hazard_score + recency_score + verified_bonus + sentiment_score

        ranked.append({
            "id": post.get("id") or post.get("_id"),
            "caption": caption,
            "hazardType": hazard_type,
            "location": post.get("location", {}),
            "verified": verified,
            "sentiment": sentiment,
            "score": round(score, 2),
            "createdAt": created_at,
            "user": post.get("user", {}),
            "photos": post.get("photos", [])
        })

    ranked.sort(key=lambda x: x["score"], reverse=True)
    return ranked
