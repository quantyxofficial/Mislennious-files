---
id: stats-functions
title: Statistical Functions in NumPy
description: Use NumPy to perform essential statistical analysis on your datasets with ease.
order: 8
---

Statistics is the backbone of Data Science. NumPy provides a robust set of functions to calculate basic and advanced statistics directly on arrays.

## Central Tendency
- **Mean**: The average of the elements. (`np.mean(arr)`)
- **Median**: The middle value. (`np.median(arr)`)
- **Mode**: (Note: NumPy doesn't have a direct mode function; usually `scipy.stats.mode` is used, but you can find it using `np.unique`).

## Measures of Dispersion
- **Standard Deviation (`std`)**: Measures how spread out the numbers are.
- **Variance (`var`)**: The average of the squared differences from the Mean.

```python
import numpy as np
data = np.array([20, 2, 7, 1, 34])

print("Mean:", np.mean(data))
print("Median:", np.median(data))
print("Std Dev:", np.std(data))
print("Variance:", np.var(data))
```

## Percentiles and Quantiles
Percentiles tell you the value below which a given percentage of data falls.
```python
# 50th percentile is the same as the median
print("75th Percentile:", np.percentile(data, 75))
```

## Correlation and Covariance
- **`np.corrcoef(arr1, arr2)`**: Returns the Pearson product-moment correlation coefficients.
- **`np.cov(arr)`**: Estimates the covariance matrix.

## Practical Tip
When working with real-world data, you'll often have `NaN` (Not a Number) values. Most statistical functions have a "nan-safe" version, like `np.nanmean(arr)`, which ignores the missing values.
