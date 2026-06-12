---
id: np-12
topic: Numpy
difficulty: Medium
title: Understanding Axis
type: MCQ
companyTags: [Facebook]
acceptanceRate: 65
---

# Scenario

You have a 2D matrix (3 rows, 4 columns).
You run `arr.sum(axis=0)`. What does this calculate?

## Options

- `The sum of each column (collapsing rows).`
- `The sum of each row (collapsing columns).`
- `The sum of the entire matrix.`
- `The sum of the diagonal.`

## Correct Answer

```
The sum of each column (collapsing rows).
```

## Explanation

`axis=0` refers to the vertical axis (rows). Collapsing it means you are summing *down* the rows, resulting in one value per column. Result shape: `(4,)`.
