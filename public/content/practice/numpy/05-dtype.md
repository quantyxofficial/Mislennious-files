---
id: np-05
topic: Numpy
difficulty: Basic
title: Data Types
type: MCQ
companyTags: [Netflix]
acceptanceRate: 88
---

# Scenario

You have an array: `arr = np.array([1.5, 2.7, 3.2])`.
What happens if you run `arr.astype(int)`?

## Options

- `It rounds the numbers to the nearest integer (2, 3, 3).`
- `It truncates the decimal part (1, 2, 3).`
- `It throws a TypeError.`
- `It creates a list of strings.`

## Correct Answer

```
It truncates the decimal part (1, 2, 3).
```

## Explanation

Casting float to int in NumPy (and Python generally) truncates towards zero. It does NOT round. `1.9` becomes `1`.
