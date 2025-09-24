import sys, os

# Add the python-nlp-service folder to path
ROOT = os.path.join(os.path.dirname(__file__), "..", "backend", "python-nlp-service")
if ROOT not in sys.path:
    sys.path.append(ROOT)

# Import the Flask app from server/api.py
from server.api import app
