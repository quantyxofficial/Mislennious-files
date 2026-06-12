---
id: subplots
title: Subplots & Grids
description: Display multiple plots in a single figure like a dashboard.
order: 4
---

## The Dashboard View

Comparing two graphs side-by-side is powerful. We do this with `subplots`.

### 1. Creating a Grid

`plt.subplots(rows, cols)` returns a Figure and an **Array of Axes**.

```python
# 2 Rows, 2 Columns (4 graphs total)
fig, axes = plt.subplots(2, 2, figsize=(10, 8))

# axes is now a 2x2 matrix: [[ax1, ax2], [ax3, ax4]]
ax1 = axes[0, 0] # Top Left
ax2 = axes[0, 1] # Top Right
ax3 = axes[1, 0] # Bottom Left
ax4 = axes[1, 1] # Bottom Right

# Plot on them individually
ax1.plot([1, 2, 3], [1, 4, 9])
ax1.set_title("Linear")

ax2.scatter([1, 2], [1, 2])
ax2.set_title("Scatter")

# Adjust spacing automatically
plt.tight_layout()
```

### 2. Sharing Axes

If two plots share the same x-axis (e.g., Time), link them.

```python
fig, (ax1, ax2) = plt.subplots(2, 1, sharex=True)
# Now zooming on ax1's x-axis will automatically zoom ax2!
```

This is how professional trading charts are built.
