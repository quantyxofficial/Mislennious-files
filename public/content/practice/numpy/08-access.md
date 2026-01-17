---
id: np-08
topic: Numpy
difficulty: Basic
title: Accessing Elements
type: MCQ
companyTags: [Amazon]
acceptanceRate: 96
---

# Scenario

Given `arr = np.array([[1, 2], [3, 4]])`, how do you access the number `3`?

## Options

- `arr[1, 0]`
- `arr[0, 1]`
- `arr[1][1]`
- `arr[2, 1]`

## Correct Answer

```
arr[1, 0]
```

## Explanation

Rows are 0-indexed. `3` is in the second row (Index 1) and first column (Index 0). So `arr[1, 0]`.
