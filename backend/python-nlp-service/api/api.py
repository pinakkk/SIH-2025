from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import logging
from services.hazard_ranker import rank_posts

app = Flask(__name__)
CORS(app)

# Setup logging
logging.basicConfig(level=logging.INFO)

@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"message": "NLP Ranking Service is running"}), 200


@app.route("/rank-posts", methods=["GET"])
def rank_posts_from_file():
    """
    For testing: Load sample dataset and return ranked posts.
    """
    try:
        with open("datasets/sample_posts.json", "r") as f:
            posts = json.load(f)
        ranked = rank_posts(posts)
        return jsonify({"rankedPosts": ranked}), 200
    except Exception as e:
        logging.error(f"Error reading sample file: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/rank-posts", methods=["POST"])
def rank_posts_from_input():
    """
    Rank hazard reports from input JSON.
    Input: { "posts": [...] }
    """
    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 415

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Invalid or empty JSON"}), 400

    posts = data.get("posts")
    if not posts:
        return jsonify({"error": "No posts provided"}), 400

    logging.info(f"Received {len(posts)} posts for ranking")

    ranked = rank_posts(posts)
    return jsonify({"rankedPosts": ranked}), 200
