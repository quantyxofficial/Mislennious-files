---
id: mpl-11
topic: Matplotlib
difficulty: Medium
title: Creating Subplots
type: MCQ
companyTags: [Tesla]
acceptanceRate: 70
---

# Scenario

`fig, axes = plt.subplots(2, 3)`. What is the shape of `axes`?

## Options

- `(2, 3)`
- `(6,)`
- `(5,)`
- `(3, 2)`

## Correct Answer

```
(2, 3)
```

## Explanation

It returns a NumPy array of Axes objects with shape (Rows, Cols). You access them like `axes[0, 1]`.
