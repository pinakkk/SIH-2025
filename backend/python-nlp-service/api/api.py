from flask import Flask, request, jsonify
from services.nlp_processor import NLPProcessor

def create_app():
    """Creates and configures the Flask application."""
    app = Flask(__name__)
    
    try:
        nlp_processor = NLPProcessor()
    except Exception as e:
        print(f"FATAL: Could not initialize NLPProcessor: {e}")
        nlp_processor = None

    @app.route("/health", methods=["GET"])
    def health_check():
        """Health check endpoint to confirm the service is running."""
        if nlp_processor:
            return jsonify({"status": "ok", "message": "NLP service is healthy."}), 200
        else:
            return jsonify({"status": "error", "message": "NLP service failed to initialize."}), 503

    @app.route("/api/v1/analyze", methods=["POST"])
    def analyze_text():
        """
        Analyzes text from a JSON payload.
        Expects: {"text": "Your text to analyze here."}
        """
        if not nlp_processor:
            return jsonify({"error": "NLP service is not available."}), 503

        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error": "Missing 'text' key in request body."}), 400

        try:
            result = nlp_processor.process(data["text"])
            if "error" in result:
                return jsonify(result), 400
            return jsonify(result), 200
        except Exception as e:
            print(f"Error during analysis: {e}")
            return jsonify({"error": "An internal server error occurred."}), 500
            
    return app