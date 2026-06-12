---
id: pd-08
topic: Pandas
difficulty: Basic
title: Handling Missing Data
type: MCQ
companyTags: [Citi]
acceptanceRate: 85
---

# Scenario

You have `NaN` values in your 'Score' column. You want to replace them with `0`.

## Options

- `df['Score'].dropna()`
- `df['Score'].replace(np.nan, 0)`
- `df['Score'].fillna(0)`
- `df['Score'].isnull(0)`

## Correct Answer

```
df['Score'].fillna(0)
```

## Explanation

`fillna(value)` is the dedicated method for imputation.
