---
id: pd-05
topic: Pandas
difficulty: Basic
title: Checking Data Types
type: MCQ
companyTags: [JPMorgan]
acceptanceRate: 90
---

# Scenario

Which command gives you a summary of columns, their null counts, and data types?

## Options

- `df.describe()`
- `df.info()`
- `df.dtypes`
- `df.summary()`

## Correct Answer

```
df.info()
```

## Explanation

`df.info()` is the definitive "X-ray" scan. `df.describe()` is for detailed statistics (mean/std). `df.dtypes` only shows types, not null counts.
