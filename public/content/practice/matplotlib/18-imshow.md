---
id: mpl-18
topic: Matplotlib
difficulty: Hard
title: Image Show
type: MCQ
companyTags: [OpenAI]
acceptanceRate: 45
---

# Scenario

Which function is best for visualizing a 2D Matrix (Heatmap) or an Image?

## Options

- `ax.plot()`
- `ax.image()`
- `ax.imshow()`
- `ax.heatmap()`

## Correct Answer

```
ax.imshow()
```

## Explanation

`imshow` (Image Show) renders values as colors in a grid. `heatmap()` exists in Seaborn, but in core Matplotlib, `imshow` is the engine.
