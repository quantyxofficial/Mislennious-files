---
id: clustering
title: K-Means Clustering
description: Unsupervised Learning - Finding hidden groups in data.
order: 7
---

## Finding Structure in Chaos

In Supervised learning, we have labels (Cat/Dog). In Unsupervised learning, we just have data coordinates. We want to find "Clusters".

### K-Means Algorithm
1.  Choose K (e.g., K=3 clusters).
2.  Place 3 random centroids.
3.  Assign every point to the nearest centroid.
4.  Move centroids to the average of their points.
5.  Repeat until they stop moving.

### Implementation

```python
from sklearn.cluster import KMeans

# Find 3 groups
model = KMeans(n_clusters=3)

model.fit(X) # Notice: No y!

# Get cluster labels (0, 1, 2)
labels = model.labels_
```

### The Elbow Method
How do you pick K?
Plot the "Inertia" (Sum of Squared Errors) vs K. Look for the "Elbow" where the curve bends.
