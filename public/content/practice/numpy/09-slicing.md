---
id: np-09
topic: Numpy
difficulty: Medium
title: Array Slicing
type: MCQ
companyTags: [Uber]
acceptanceRate: 75
---

# Scenario

`arr = np.array([0, 1, 2, 3, 4, 5])`
What does `arr[2:5]` return?

## Options

- `[2, 3, 4, 5]`
- `[2, 3, 4]`
- `[3, 4, 5]`
- `[2, 5]`

## Correct Answer

```
[2, 3, 4]
```

## Explanation

Slicing is `[start:stop]`. The start index (2) is included. The stop index (5) is **excluded**. So it returns indices 2, 3, and 4.
