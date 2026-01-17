---
id: pd-16
topic: Pandas
difficulty: Hard
title: Merging Datasets
type: MCQ
companyTags: [Amazon]
acceptanceRate: 50
---

# Scenario

You perform `pd.merge(A, B, how='left')`. Table A has 10 rows. Table B matches 3 of those rows.
How many rows will the result have?

## Options

- `3 rows.`
- `10 rows.`
- `13 rows.`
- `7 rows.`

## Correct Answer

```
10 rows.
```

## Explanation

A Left Join preserves **all** rows from the Left table (A). If there is a match in B, it adds the data. If not, it fills with NaN. The row count remains 10 (unless B has duplicate keys for a single row in A, which would cause row explosion, but generally it preserves the left side).
