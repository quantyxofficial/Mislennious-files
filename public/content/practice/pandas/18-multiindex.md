---
id: pd-18
topic: Pandas
difficulty: Hard
title: Multi-Index Selection
type: MCQ
companyTags: [Hedge Funds]
acceptanceRate: 35
---

# Scenario

You have a MultiIndex DataFrame (Index Level 0: 'City', Level 1: 'Store').
How do you select all stores in 'NY'?

## Options

- `df.loc['NY']`
- `df.iloc['NY']`
- `df['NY']`
- `df.query('City' == 'NY')`

## Correct Answer

```
df.loc['NY']
```

## Explanation

With a MultiIndex, `.loc['NY']` slices the outer level of the index. It returns a DataFrame containing all rows where City match 'NY'.
