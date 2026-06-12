---
id: pd-10
topic: Pandas
difficulty: Medium
title: Boolean Indexing
type: MCQ
companyTags: [Facebook]
acceptanceRate: 75
---

# Scenario

How do you select all rows where 'Age' is greater than 30?

## Options

- `df['Age' > 30]`
- `df[df['Age'] > 30]`
- `df.filter('Age' > 30)`
- `df.where(df['Age'] > 30)`

## Correct Answer

```
df[df['Age'] > 30]
```

## Explanation

This is standard Boolean Indexing. You pass a boolean Series (`df['Age'] > 30`) inside the brackets `[]`.
