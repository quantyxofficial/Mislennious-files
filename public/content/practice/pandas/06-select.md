---
id: pd-06
topic: Pandas
difficulty: Basic
title: Selecting Columns
type: MCQ
companyTags: [Oracle]
acceptanceRate: 94
---

# Scenario

How do you select a single column 'Age' from DataFrame `df`?

## Options

- `df('Age')`
- `df['Age']`
- `df.select('Age')`
- `df.column('Age')`

## Correct Answer

```
df['Age']
```

## Explanation

Pandas uses dictionary-style access `df['ColumnName']` or attribute access `df.Age` (if the name allows it). Bracket notation is safer.
