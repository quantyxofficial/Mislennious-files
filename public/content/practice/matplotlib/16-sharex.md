---
id: mpl-16
topic: Matplotlib
difficulty: Hard
title: Sharing Axes
type: MCQ
companyTags: [Finance]
acceptanceRate: 60
---

# Scenario

You want 2 stacked subplots that share the same X-axis (zooming one zooms both).

## Options

- `plt.subplots(2, 1, sharex=True)`
- `plt.subplots(2, 1, link_x=True)`
- `ax1.share(ax2)`
- `plt.link_axes(ax1, ax2)`

## Correct Answer

```
plt.subplots(2, 1, sharex=True)
```

## Explanation

The `sharex` and `sharey` arguments in `subplots()` link the axes properties, ensuring they stay perfectly aligned during interactive exploration or resizing.
