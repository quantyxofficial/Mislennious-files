---
id: np-07
topic: Numpy
difficulty: Basic
title: Initializing Zeros
type: MCQ
companyTags: [Google]
acceptanceRate: 91
---

# Scenario

Which command creates a 3x3 matrix filled with zeros?

## Options

- `np.zeros(3)`
- `np.zeros(3, 3)`
- `np.zeros((3, 3))`
- `np.empty((3, 3))`

## Correct Answer

```
np.zeros((3, 3))
```

## Explanation

`np.zeros` takes a single argument for shape. If it's multidimensional, you must pass a **tuple** like `(3, 3)`. Passing `3, 3` as separate arguments is a common error.
