---
id: annotations
title: Annotations & Text
description: Add text, arrows, and shapes to tell a story.
order: 8
---

## Storytelling with Data

A graph without context is just lines. You need to guide the viewer.
"Look at this peak!" "This dip was caused by the recession."

### 1. `ax.text()`

Place text anywhere on using (x, y) coordinates.

```python
# Place 'Peak' at position x=2, y=10
ax.text(2, 10, "Peak", fontsize=12, color='red')
```

### 2. `ax.annotate()` (Arrows)

The professional way to point at things.

```python
ax.annotate('Important Point', 
            xy=(2, 10),           # Arrow tip location
            xytext=(3, 15),       # Text location
            arrowprops=dict(facecolor='black', shrink=0.05))
```

### 3. `ax.axhline()` and `ax.axvline()`

Draw Reference Lines. Infinite horizontal or vertical lines.

```python
# Draw a red line at y=0 (Baseline)
ax.axhline(0, color='red', linewidth=2)

# Draw a line at the Average
avg = np.mean(data)
ax.axhline(avg, linestyle='--', label='Average')
```

### 4. Titles for Subplots

When using subplots, `ax.set_title()` names the individual graph. `fig.suptitle()` names the **Whole Canvas**.

```python
fig.suptitle("Quarterly Report 2025", fontsize=20)
```
