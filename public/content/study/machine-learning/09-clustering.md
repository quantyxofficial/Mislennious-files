---
id: clustering
title: Unsupervised Learning
description: K-Means, finding hidden structure, and choosing k without labels.
order: 9
---

## Learning Without an Answer Key

Everything so far has been *supervised* — every example came with a correct label to learn from. But often you have data and **no labels at all**, just a pile of customers, transactions, or documents, and the question: *"What natural groups exist in here?"* That's **unsupervised learning**, and its most important tool is **clustering**.

Real uses are everywhere:

- **Customer segmentation** — group shoppers by behavior to target marketing.
- **Anomaly detection** — points that fit no cluster are likely fraud or faults.
- **Image compression** — reduce millions of colors to a representative few.
- **Document grouping** — organize articles by topic without pre-defined categories.

## K-Means: The Workhorse

**K-Means** partitions your data into `k` groups, each defined by its center (the *centroid*). It runs a beautifully simple loop:

```
1. Pick k random points as initial centroids.
2. Assign each data point to its nearest centroid.
3. Move each centroid to the average of its assigned points.
4. Repeat steps 2–3 until the centroids stop moving.
```

It converges to clusters where points are close to their own center and far from others. That's the entire algorithm — and it scales to millions of points.

```python
from sklearn.cluster import KMeans

model = KMeans(n_clusters=3, n_init=10, random_state=42)
labels = model.fit_predict(X)     # → which cluster each point belongs to

model.cluster_centers_            # the coordinates of each centroid
```

## You Must Scale First

K-Means measures **distance**, so it is acutely sensitive to feature scale. If `income` ranges 0–200,000 and `age` ranges 0–100, income utterly dominates the distance and `age` is ignored. Always standardize before clustering:

```python
from sklearn.preprocessing import StandardScaler
X_scaled = StandardScaler().fit_transform(X)
labels = KMeans(n_clusters=4, n_init=10).fit_predict(X_scaled)
```

This is the most common K-Means mistake — forget it and your clusters are meaningless.

## The Hard Part: Choosing k

K-Means needs you to specify `k` up front — but how many groups are *really* in the data? Two standard techniques guide the choice:

### The Elbow Method

Plot the **inertia** (total within-cluster distance) for a range of `k` values. As `k` rises, inertia always falls — but at some point the improvement flattens. That bend, the "elbow," marks the sweet spot where adding clusters stops paying off:

```python
inertias = []
for k in range(1, 11):
    inertias.append(KMeans(n_clusters=k, n_init=10).fit(X_scaled).inertia_)
# Plot inertias vs k → look for the elbow
```

### The Silhouette Score

This measures how well each point sits in its cluster versus the nearest other cluster, from −1 to +1. Higher is better; pick the `k` that maximizes it:

```python
from sklearn.metrics import silhouette_score
score = silhouette_score(X_scaled, labels)   # closer to 1 = tighter, well-separated clusters
```

## The Limits of K-Means

K-Means is fast and intuitive but makes strong assumptions worth knowing:

- It assumes clusters are **round and similarly sized** — it struggles with elongated or nested shapes.
- It's sensitive to **outliers**, which can drag centroids off course.
- The random start means results can vary; `n_init=10` runs it several times and keeps the best.

When these bite, you reach for alternatives — **DBSCAN** (density-based, finds arbitrary shapes and outliers) or **hierarchical clustering** (builds a tree of nested groups). But K-Means is the right first tool the vast majority of the time.

## Validating the Unvalidatable

The genuine challenge of unsupervised learning: with no labels, there's no "accuracy" to check. You evaluate clusters by:

1. **Internal metrics** — silhouette score, inertia (above).
2. **Domain sense** — do the segments actually mean something? "Cluster 2 is high-income frequent buyers" is a *useful* cluster; a random partition isn't.
3. **Downstream impact** — does acting on the segments (targeting, alerting) improve a real outcome?

Good clustering is as much interpretation as computation. The numbers narrow the options; your judgment picks the answer.

## Where It Fits in the Workflow

Clustering is often a *feature-engineering* step for supervised learning: assign each row a cluster label, then feed that label as a new feature into a classifier. It's also your go-to for the exploratory phase — *before* you even have labels — to understand the shape of your data.

With both supervised and unsupervised learning in hand, we return to the most important practical skill of all: measuring whether a model is actually any good. Next chapter — evaluation done right.
