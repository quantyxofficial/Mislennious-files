---
id: matrices
title: Heatmaps & Matrices
description: Visualizing 2D data and correlations with color.
order: 7
---

## Color as a Dimension

A **Heatmap** uses color to represent the magnitude of values in a matrix.
It is perfect for:
1.  **Correlation Matrices** (Which features are related?).
2.  **Confusion Matrices** (Where is the model making errors?).

### 1. `imshow` (Image Show)

The core function for displaying matrices.

```python
data = np.random.rand(10, 10) # 10x10 Matrix

fig, ax = plt.subplots()
cax = ax.imshow(data, cmap='hot', interpolation='nearest')

# Add a colorbar (legend)
fig.colorbar(cax)
```

### 2. Correlation Example

```python
import pandas as pd
df = pd.DataFrame(np.random.randn(10, 5), columns=list('ABCDE'))
corr_matrix = df.corr()

fig, ax = plt.subplots()
ax.imshow(corr_matrix, cmap='coolwarm')
```

**Pro Tip**: For professional Heatmaps with annotations (numbers inside squares), most people use `seaborn.heatmap()`, which is built on top of Matplotlib. But `imshow` is the foundational engine.
