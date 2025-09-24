# import datetime
# from services.nlp_processor import analyze_text

# # Hazard severity weights
# HAZARD_WEIGHTS = {
#     "tsunami": 5,
#     "storm surge": 4,
#     "flood": 4,
#     "high waves": 3,
#     "swell": 2,
#     "fire": 1
# }

# def rank_posts(posts):
#     """
#     Rank posts by priority based on hazard type, recency, sentiment, verification.
#     """
#     ranked = []
#     now = datetime.datetime.utcnow()

#     for post in posts:
#         caption = post.get("caption", "")
#         hazard_type = post.get("hazardType", "unknown").lower()
#         verified = post.get("verified", False)
#         created_at = post.get("createdAt")

#         # NLP analysis
#         nlp_result = analyze_text(caption)
#         sentiment = nlp_result.get("sentiment", "neutral")

#         # Hazard weight
#         hazard_score = HAZARD_WEIGHTS.get(hazard_type, 1)

#         # Recency score
#         recency_score = 0
#         if created_at:
#             try:
#                 post_time = datetime.datetime.fromisoformat(created_at.replace("Z", "+00:00"))
#                 hours_old = (now - post_time).total_seconds() / 3600
#                 recency_score = max(0, 5 - (hours_old / 2))  # decay over 10 hrs
#             except:
#                 recency_score = 1

#         # Verified bonus
#         verified_bonus = 2 if verified else 0

#         # Sentiment urgency
#         sentiment_score = 2 if sentiment == "negative" else (1 if sentiment == "neutral" else 0)

#         # Final score
#         score = hazard_score + recency_score + verified_bonus + sentiment_score

#         ranked.append({
#             "id": post.get("id") or post.get("_id"),
#             "caption": caption,
#             "hazardType": hazard_type,
#             "location": post.get("location", {}),
#             "verified": verified,
#             "sentiment": sentiment,
#             "score": round(score, 2)
#         })

#     ranked.sort(key=lambda x: x["score"], reverse=True)
#     return ranked

import datetime
import pytz
from services.nlp_processor import analyze_text

# Hazard severity weights
HAZARD_WEIGHTS = {
    "tsunami": 5,
    "storm surge": 4,
    "flood": 4,
    "high waves": 3,
    "swell": 2,
    "fire": 1
}

IST = pytz.timezone("Asia/Kolkata")

def rank_posts(posts):
    """
    Rank posts by priority based on hazard type, recency, sentiment, verification.
    Adds IST posting time and media URLs (photos/videos).
    """
    ranked = []
    now = datetime.datetime.utcnow().replace(tzinfo=pytz.UTC)

    for post in posts:
        caption = post.get("caption", "")
        hazard_type = post.get("hazardType", "unknown").lower()
        verified = post.get("verified", False)
        created_at = post.get("createdAt")

        # NLP analysis
        nlp_result = analyze_text(caption)
        sentiment = nlp_result.get("sentiment", "neutral")

        # Hazard weight
        hazard_score = HAZARD_WEIGHTS.get(hazard_type, 1)

        # Recency score & IST conversion
        recency_score = 0
        post_time_ist = None
        if created_at:
            try:
                post_time = datetime.datetime.fromisoformat(created_at.replace("Z", "+00:00"))
                post_time_utc = post_time.replace(tzinfo=pytz.UTC)
                post_time_ist = post_time_utc.astimezone(IST).strftime("%Y-%m-%d %I:%M:%S %p")
                hours_old = (now - post_time_utc).total_seconds() / 3600
                recency_score = max(0, 5 - (hours_old / 2))  # decay after 10 hrs
            except Exception:
                recency_score = 1

        # Verified bonus
        verified_bonus = 2 if verified else 0

        # Sentiment urgency
        sentiment_score = 2 if sentiment == "negative" else (1 if sentiment == "neutral" else 0)

        # Final score
        score = hazard_score + recency_score + verified_bonus + sentiment_score

        ranked.append({
            "id": post.get("id") or post.get("_id"),
            "caption": caption,
            "hazardType": hazard_type,
            "location": post.get("location", {}),
            "verified": verified,
            "sentiment": sentiment,
            "score": round(score, 2),
            "postedAtIST": post_time_ist if post_time_ist else "Unknown",
            "photos": post.get("photos", []),
            "videos": post.get("videos", []),
            "user": {
                "id": post.get("user", {}).get("_id") if isinstance(post.get("user"), dict) else None,
                "username": post.get("user", {}).get("username") if isinstance(post.get("user"), dict) else None,
                "profilePic": post.get("user", {}).get("profilePic") if isinstance(post.get("user"), dict) else None
            }
        })

    ranked.sort(key=lambda x: x["score"], reverse=True)
    return ranked
