---
id: np-15
topic: Numpy
difficulty: Medium
title: Arange vs Linspace
type: MCQ
companyTags: [SpaceX]
acceptanceRate: 78
---

# Scenario

Which function is best if you want "exactly 50 points between 0 and 100"?

## Options

- `np.arange(0, 100, 50)`
- `np.linspace(0, 100, 50)`
- `np.pts(0, 100, 50)`
- `np.range(0, 100)`

## Correct Answer

```
np.linspace(0, 100, 50)
```

## Explanation

`arange` takes a *step size* (e.g., step of 2).
`linspace` takes a *count* (e.g., 50 items).
When you need a specific number of data points (common in plotting), use `linspace`.
