---
id: pd-07
topic: Pandas
difficulty: Basic
title: Checking Dimensions
type: MCQ
companyTags: [IBM]
acceptanceRate: 93
---

# Scenario

How do you find out how many rows and columns a DataFrame has?

## Options

- `df.size`
- `df.shape`
- `len(df)`
- `df.dimensions()`

## Correct Answer

```
df.shape
```

## Explanation

`df.shape` returns a tuple `(rows, columns)`. `len(df)` only returns the number of rows.
