---
id: pd-13
topic: Pandas
difficulty: Medium
title: Counting Values
type: MCQ
companyTags: [Netflix]
acceptanceRate: 85
---

# Scenario

How do you find the unique values in a column and how often they appear (e.g., counting users by Country)?

## Options

- `df['Country'].unique()`
- `df['Country'].count()`
- `df['Country'].value_counts()`
- `df.groupby('Country').count()`

## Correct Answer

```
df['Country'].value_counts()
```

## Explanation

`value_counts()` returns a sorted Series with the counts of unique values. `unique()` only lists the values, it doesn't count them.
