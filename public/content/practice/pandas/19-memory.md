---
id: pd-19
topic: Pandas
difficulty: Hard
title: Memory Optimization
type: MCQ
companyTags: [Uber]
acceptanceRate: 40
---

# Scenario

You have a column 'Status' with 1 million rows, but only 3 unique values: "Active", "Inactive", "Pending".
How do you optimize memory usage?

## Options

- `df['Status'] = df['Status'].astype('category')`
- `df['Status'] = df['Status'].astype('string')`
- `df['Status'] = df['Status'].apply(lambda x: 0 if x=='Active' else 1)`
- `Keep it as object.`

## Correct Answer

```
df['Status'] = df['Status'].astype('category')
```

## Explanation

Converting low-cardinality string columns to `'category'` creates an internal dictionary mapping (0, 1, 2) which drastically reduces memory usage compared to storing millions of string objects.
