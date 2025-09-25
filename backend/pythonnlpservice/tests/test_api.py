import json
from api.api import app

def test_analyze_text():
    client = app.test_client()
    response = client.post("/analyze-text", json={"text": "Flood reported near Chennai"})
    data = json.loads(response.data)
    assert "keywords" in data
    assert "sentiment" in data
    assert data["sentiment"] == "negative"

def test_cluster_reports():
    client = app.test_client()
    reports = [
        {"location": {"coordinates": [77.5946, 12.9716]}},
        {"location": {"coordinates": [77.5950, 12.9720]}},
        {"location": {"coordinates": [80.2707, 13.0827]}}
    ]
    response = client.post("/cluster-reports", json={"reports": reports})
    data = json.loads(response.data)
    assert "labels" in data
    assert len(data["labels"]) == len(reports)
