---
id: np-18
topic: Numpy
difficulty: Hard
title: Fancy Indexing
type: MCQ
companyTags: [Hedge Funds]
acceptanceRate: 50
---

# Scenario

`arr = np.array([10, 20, 30, 40])`
`indices = [0, 0, 3]`
What does `arr[indices]` return?

## Options

- `[10, 10, 40]`
- `[10, 40]`
- `Error: Index 0 used twice.`
- `A reference to the original array positions.`

## Correct Answer

```
[10, 10, 40]
```

## Explanation

This is Fancy Indexing. You can pass a list of indices, and NumPy will construct a new array containing the elements at those positions, even if they are duplicates.
