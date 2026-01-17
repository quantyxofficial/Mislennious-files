---
id: np-19
topic: Numpy
difficulty: Hard
title: Stacking Arrays
type: MCQ
companyTags: [Tesla Autopilot]
acceptanceRate: 55
---

# Scenario

`a` shape: `(3,)`
`b` shape: `(3,)`
`np.stack([a, b])` creates an array of what shape?

## Options

- `(2, 3)`
- `(6,)`
- `(3, 2)`
- `(2,)`

## Correct Answer

```
(2, 3)
```

## Explanation

`np.stack` adds a **new axis**. By default (`axis=0`), it stacks them as rows. So you get 2 rows of 3 columns.
If you used `np.concatenate`, you would get `(6,)`.
