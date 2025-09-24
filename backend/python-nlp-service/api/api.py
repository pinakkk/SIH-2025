from flask import Flask, request, jsonify
from flask_cors import CORS
from services.nlp_processor import analyze_text
from utils.geo_cluster import cluster_reports

app = Flask(__name__)
CORS(app)

@app.route("/analyze-text", methods=["POST"])
def analyze_text_api():
    """
    Analyze a given text for keywords and sentiment.
    """
    data = request.json
    text = data.get("text", "")
    result = analyze_text(text)
    return jsonify(result)

@app.route("/cluster-reports", methods=["POST"])
def cluster_reports_api():
    """
    Cluster reports based on geolocation.
    Expects: {"reports": [{ "location": {"coordinates": [lng, lat]} }, ...]}
    """
    data = request.json
    reports = data.get("reports", [])
    labels = cluster_reports(reports)
    return jsonify({"labels": labels})
