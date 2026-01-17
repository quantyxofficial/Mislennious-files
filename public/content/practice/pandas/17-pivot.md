---
id: pd-17
topic: Pandas
difficulty: Hard
title: Pivot Tables
type: MCQ
companyTags: [Microsoft]
acceptanceRate: 45
---

# Scenario

You want a table where rows are 'City', columns are 'Year', and values are the sum of 'Sales'.

## Options

- `df.groupby(['City', 'Year'])['Sales'].sum()`
- `df.pivot_table(index='City', columns='Year', values='Sales', aggfunc='sum')`
- `df.pivot(index='Year', columns='City', values='Sales')`
- `df.crosstab('City', 'Year')`

## Correct Answer

```
df.pivot_table(index='City', columns='Year', values='Sales', aggfunc='sum')
```

## Explanation

`pivot_table` is the most powerful reshaping tool. `pivot` is simpler but fails if there are duplicate entries for the index/column combination. `pivot_table` aggregates duplicate entries (using `aggfunc='sum'`).
