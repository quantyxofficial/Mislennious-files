---
id: pd-20
topic: Pandas
difficulty: Hard
title: Vectorization vs Apply
type: MCQ
companyTags: [High Performance Computing]
acceptanceRate: 30
---

# Scenario

Which operation is generally **slowest** in Pandas?

## Options

- `df['A'] + df['B']`
- `df.groupby('A').sum()`
- `df.apply(lambda row: func(row), axis=1)`
- `df['A'].str.upper()`

## Correct Answer

```
df.apply(lambda row: func(row), axis=1)
```

## Explanation

Row-wise `apply(axis=1)` is effectively a Python for-loop under the hood. It does not use vectorization. NumPy operations (`+`) and Cythonized methods (`groupby`, `str`) are orders of magnitude faster.
