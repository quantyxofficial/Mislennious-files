---
id: distribution
title: Distributions (Hist & Box)
description: Visualize the spread of data - Histograms and Boxplots.
order: 5
---

## Understanding Variance

Averages lie. "The average salary is $50k" tells you nothing if half the people earn $0 and half earn $100k.
We need to see the **Distribution**.

### 1. Histogram (`ax.hist`)

Shows how often values fall into "bins" (buckets).

```python
# Generate random data (Normal distribution)
data = np.random.randn(1000)

fig, ax = plt.subplots()
ax.hist(data, bins=30, color='teal', edgecolor='black')
ax.set_title("Bell Curve")
```

*   **bins**: Determines the resolution. Too few = blocky. Too many = noisy.

### 2. Box Plot (`ax.boxplot`)

Shows the Median, Quartiles (25th/75th percentiles), and Outliers.

```python
fig, ax = plt.subplots()
ax.boxplot(data)
```

*   **The Box**: The middle 50% of data.
*   **The Line**: The Median.
*   **The Dots**: Outliers.

Use Histograms to see the *shape*. Use Boxplots to spot *outliers*.
