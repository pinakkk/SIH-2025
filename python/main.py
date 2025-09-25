from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from hazard_ranker import rank_posts
import httpx

app = FastAPI(title="Hazard Ranking API", version="2.0")

# URL for your Node.js backend endpoint to fetch all reports
BACKEND_API_URL = "http://localhost:5002/api/all-Reports"

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Hazard API running",
        "docs": "/docs",  # Quick link to Swagger UI
        "endpoints": ["/ping", "/rank-posts (GET)", "/rank-posts (POST)"]
    }

@app.get("/ping")
async def ping():
    return {"message": "pong"}

@app.get("/rank-posts")
async def rank_posts_realtime():
    """Fetches real-time reports from the backend, ranks them, and returns the result."""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(BACKEND_API_URL)
            response.raise_for_status()  # Raise an exception for HTTP errors

            api_data = response.json()
            reports = api_data.get("data", [])

            if not reports:
                return {"rankedPosts": []}

            # Transform data to match the format expected by the ranker function
            # (e.g., mapping '_id' to 'id' and 'createdAt' to 'timestamp')
            transformed_posts = [
                {**post, "id": post.get("_id"), "timestamp": post.get("createdAt")}
                for post in reports
            ]

            ranked = rank_posts(transformed_posts)
            return {"rankedPosts": ranked}

    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=503, detail=f"Error communicating with backend API: {exc}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An internal error occurred: {e}"
        )

@app.post("/rank-posts")
async def rank_posts_from_input(data: dict):
    """Accepts posts and returns ranked results"""
    posts = data.get("posts", [])
    if not posts:
        raise HTTPException(status_code=400, detail="No posts provided")
    ranked = rank_posts(posts)
    return {"rankedPosts": ranked}


# ✅ Local run support (not used on Render)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
