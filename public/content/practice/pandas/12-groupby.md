---
id: pd-12
topic: Pandas
difficulty: Medium
title: GroupBy Aggregation
type: MCQ
companyTags: [Uber]
acceptanceRate: 70
---

# Scenario

You want to find the average 'Score' per 'City'.

## Options

- `df.groupby('City').mean()['Score']`
- `df.groupby('City')['Score'].mean()`
- `df.mean().groupby('City')`
- `df.pivot('City', 'Score')`

## Correct Answer

```
df.groupby('City')['Score'].mean()
```

## Explanation

The standard pattern is: `df.groupby('GroupingColumn')['TargetColumn'].aggregation()`.
