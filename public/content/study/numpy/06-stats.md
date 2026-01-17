---
id: statistical-insights
title: Statistical Insights
description: Derive meaning from chaos - Mean, Median, Deviation, and Percentiles.
order: 6
---

## From Numbers to Knowledge

You have a dataset with 1,000,000 rows. Looking at the raw numbers is useless. You need **Summary Statistics** to understand the "shape" of the data.

NumPy provides instant statistical analysis.

### 1. The Big Three: Mean, Median, Sum

```python
import numpy as np

incomes = np.array([5000, 2000, 3000, 100000]) # Note the outlier (100k)

# Mean (Average) - Sensitive to outliers
print(np.mean(incomes)) 
# Output: 27,500 (Misleadingly high because of the 100k)

# Median (Middle Value) - Robust to outliers
print(np.median(incomes))
# Output: 4,000 (Much better representation of a "typical" person)

# Total
print(np.sum(incomes))
```

### 2. Min, Max, and Everything in Between

```python
prices = np.array([12, 5, 20, 8])

print(np.min(prices))       # 5
print(np.max(prices))       # 20
print(np.argmax(prices))    # 2 (The index where the max value lives)
```
**Pro Tip**: `argmax` is used constantly in Deep Learning to find which class has the highest probability.

### 3. Spread: Standard Deviation & Variance

How "spread out" is your data?
*   Low Std Dev: Data points are close to the average.
*   High Std Dev: Data points are spread out over a wide range.

```python
scores = np.array([48, 50, 52])
print(np.std(scores))
# Output: Low (values are tight)
```

### 4. Percentiles and Quantiles

"You are in the top 1%." What does that mean? It means you are above the 99th percentile.

```python
data = np.arange(101) # 0 to 100

print(np.percentile(data, 25)) # 25 (25th percentile)
print(np.percentile(data, 75)) # 75 (75th percentile)
```

### 5. Axis: The Direction of Stats

In a 2D matrix (Rows, Cols), you usually want stats *per row* or *per column*.

```python
grades = np.array([
    [90, 90], # Student A (Math, English)
    [50, 60]  # Student B (Math, English)
])

# Average score PER EXAM (Collapse rows, calculate down columns)
print(np.mean(grades, axis=0)) 
# Output: [70, 75] (Math Avg, English Avg)

# Average score PER STUDENT (Collapse columns, calculate across rows)
print(np.mean(grades, axis=1))
# Output: [90, 55] (Student A Avg, Student B Avg)
```

**Rule of Thumb**:
*   `axis=0`: Downwards (Column stats).
*   `axis=1`: Across (Row stats).
