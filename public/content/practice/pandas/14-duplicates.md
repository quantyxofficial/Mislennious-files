---
id: pd-14
topic: Pandas
difficulty: Medium
title: Removing Duplicates
type: MCQ
companyTags: [LinkedIn]
acceptanceRate: 80
---

# Scenario

You have duplicate users. How do you keep only the **first** occurrence of each 'Email'?

## Options

- `df.drop_duplicates()`
- `df.drop_duplicates(subset=['Email'], keep='first')`
- `df.unique('Email')`
- `df.distinct('Email')`

## Correct Answer

```
df.drop_duplicates(subset=['Email'], keep='first')
```

## Explanation

The `subset` argument specifies which columns to check for duplication. `keep='first'` (default) preserves the first row found.
