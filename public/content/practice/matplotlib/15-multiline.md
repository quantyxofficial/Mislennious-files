---
id: mpl-15
topic: Matplotlib
difficulty: Medium
title: Multiple Lines
type: MCQ
companyTags: [Amazon]
acceptanceRate: 88
---

# Scenario

How do you plot two lines (y1 and y2) on the same plot?

## Options

- `ax.plot([y1, y2])`
- `ax.plot(x, y1, y2)`
- `Call ax.plot(x, y1) then ax.plot(x, y2)`
- `ax.multiplot(x, [y1, y2])`

## Correct Answer

```
Call ax.plot(x, y1) then ax.plot(x, y2)
```

## Explanation

Matplotlib is state-based (mostly). Calling plot multiple times on the same Axes adds the new line to the existing canvas without erasing the previous one.
