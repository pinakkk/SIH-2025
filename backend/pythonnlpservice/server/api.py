from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os
from server.services.hazard_ranker import rank_posts

app = Flask(__name__)
CORS(app)

@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"message": "NLP Ranking Service is running"}), 200

@app.route("/rank-posts", methods=["GET"])
def rank_posts_from_file():
    """For testing: Load sample dataset and return ranked posts."""
    try:
        # dataset_path = os.path.join(
        #     os.path.dirname(__file__), "..", "datasets", "sample_posts.json"
            
        # )

        dataset_path = os.path.join(
            os.path.dirname(__file__), "../../datasets/sample_posts.json"
        )
        dataset_path = os.path.abspath(dataset_path)

        with open(dataset_path, "r") as f:
            posts = json.load(f)
        ranked = rank_posts(posts)
        return jsonify({"rankedPosts": ranked}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/rank-posts", methods=["POST"])
def rank_posts_from_input():
    """Rank hazard reports from input JSON. Input: { "posts": [...] }"""
    data = request.get_json(force=True, silent=True)
    posts = data.get("posts", []) if data else []
    if not posts:
        return jsonify({"error": "No posts provided"}), 400

    ranked = rank_posts(posts)
    return jsonify({"rankedPosts": ranked}), 200
