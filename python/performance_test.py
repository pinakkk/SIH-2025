import time
import psutil
import asyncio
from hazard_ranker import rank_posts
from sample_data import SAMPLE_POSTS

def measure_performance(posts_count=100):
    """Measure algorithm performance with different dataset sizes."""
    
    # Generate test data
    test_posts = []
    for i in range(posts_count):
        post = SAMPLE_POSTS[i % len(SAMPLE_POSTS)].copy()
        post["id"] = f"test_{i}"
        test_posts.append(post)
    
    # Measure memory before
    process = psutil.Process()
    memory_before = process.memory_info().rss / 1024 / 1024  # MB
    
    # Measure execution time
    start_time = time.time()
    ranked_posts = rank_posts(test_posts)
    end_time = time.time()
    
    # Measure memory after
    memory_after = process.memory_info().rss / 1024 / 1024  # MB
    
    execution_time = (end_time - start_time) * 1000  # milliseconds
    memory_used = memory_after - memory_before
    
    return {
        "posts_count": posts_count,
        "execution_time_ms": round(execution_time, 2),
        "memory_used_mb": round(memory_used, 2),
        "posts_per_second": round(posts_count / (execution_time / 1000), 2),
        "top_score": ranked_posts[0]["score"] if ranked_posts else 0
    }

def run_benchmark():
    """Run performance benchmark across different dataset sizes."""
    test_sizes = [10, 50, 100, 500, 1000, 5000]
    results = []
    
    print("Performance Benchmark Results")
    print("=" * 60)
    print(f"{'Posts':<8} {'Time(ms)':<10} {'Memory(MB)':<12} {'Posts/sec':<12} {'Top Score':<10}")
    print("-" * 60)
    
    for size in test_sizes:
        result = measure_performance(size)
        results.append(result)
        
        print(f"{result['posts_count']:<8} "
              f"{result['execution_time_ms']:<10} "
              f"{result['memory_used_mb']:<12} "
              f"{result['posts_per_second']:<12} "
              f"{result['top_score']:<10}")
    
    return results

if __name__ == "__main__":
    run_benchmark()
