---
id: np-11
topic: Numpy
difficulty: Medium
title: Broadcasting Basics
type: MCQ
companyTags: [Nvidia]
acceptanceRate: 70
---

# Scenario

`A = np.array([1, 2, 3])` (Shape: 3)
`B = 5`
What is the shape of `A + B`?

## Options

- `(3,)`
- `(4,)`
- `(1,)`
- `Error`

## Correct Answer

```
(3,)
```

## Explanation

Broadcasting stretches the scalar `5` into `[5, 5, 5]` to match the shape of `A`. The result is `[6, 7, 8]`, which still has the shape `(3,)`.
