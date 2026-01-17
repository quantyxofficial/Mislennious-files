---
id: np-17
topic: Numpy
difficulty: Hard
title: Matrix Multiplication
type: MCQ
companyTags: [Google Brain]
acceptanceRate: 45
---

# Scenario

`A` shape is `(3, 4)`.
`B` shape is `(3, 4)`.
You run `A @ B`. What happens?

## Options

- `ValueError: shapes (3,4) and (3,4) not aligned.`
- `It returns a (3, 3) matrix.`
- `It returns a (4, 4) matrix.`
- `It performs element-wise multiplication.`

## Correct Answer

```
ValueError: shapes (3,4) and (3,4) not aligned.
```

## Explanation

For Matrix Multiplication (`@`), the inner dimensions must match: `(M, N) @ (N, P)`.
Here, `(3, 4)` and `(3, 4)` have inner dimensions `4` and `3`. They do not match. You probably wanted `A @ B.T`.
