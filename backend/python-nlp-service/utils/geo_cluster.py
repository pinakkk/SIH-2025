import numpy as np
from sklearn.cluster import DBSCAN

def cluster_reports(reports):
    """
    Cluster hazard reports by location.
    Input: [{ "location": {"coordinates": [lng, lat]} }, ...]
    Output: list of cluster labels for each report
    """
    if not reports:
        return []

    coords = np.array([
        [r["location"]["coordinates"][0], r["location"]["coordinates"][1]]
        for r in reports if "location" in r and "coordinates" in r["location"]
    ])

    if len(coords) == 0:
        return []

    clustering = DBSCAN(eps=0.05, min_samples=2).fit(coords)
    return clustering.labels_.tolist()
