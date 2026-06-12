---
id: np-06
topic: Numpy
difficulty: Basic
title: Vector Addition
type: MCQ
companyTags: [Tesla]
acceptanceRate: 94
---

# Scenario

`a = np.array([10, 20])`
`b = np.array([1, 2])`
What is the result of `a + b`?

## Options

- `[10, 20, 1, 2]`
- `[11, 22]`
- `102012`
- `Error: Shapes mismatch`

## Correct Answer

```
[11, 22]
```

## Explanation

NumPy performs element-wise addition. `10+1` and `20+2`. This is called Vectorization.
