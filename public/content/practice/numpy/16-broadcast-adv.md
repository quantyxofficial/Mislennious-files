---
id: np-16
topic: Numpy
difficulty: Hard
title: Advanced Broadcasting
type: MCQ
companyTags: [DeepMind]
acceptanceRate: 40
---

# Scenario

`A` has shape `(8, 1, 6, 1)`.
`B` has shape `(7, 1, 5)`.
Can they be broadcast together? If so, what is the result shape?

## Options

- `Yes, shape (8, 7, 6, 5)`
- `No, dimensions mismatch.`
- `Yes, shape (8, 7, 6, 1)`
- `Yes, shape (8, 1, 6, 5)`

## Correct Answer

```
Yes, shape (8, 7, 6, 5)
```

## Explanation

Broadcasting aligns trailing dimensions.
A: `8 x 1 x 6 x 1`
B: `    7 x 1 x 5`
Result: `8 x 7 x 6 x 5`
The 1s stretch to match the other array's dimension.
