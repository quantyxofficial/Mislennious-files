---
id: mpl-05
topic: Matplotlib
difficulty: Basic
title: Scatter Plot Syntax
type: MCQ
companyTags: [Google]
acceptanceRate: 90
---

# Scenario

Which command creates a scatter plot (individual dots)?

## Options

- `ax.dots(x, y)`
- `ax.point(x, y)`
- `ax.scatter(x, y)`
- `ax.plot(x, y, style='dots')`

## Correct Answer

```
ax.scatter(x, y)
```

## Explanation

`scatter()` is specifically for dot plots. While `plot(x, y, 'o')` can also do it, `scatter` allows mapping size and color to individual points.
