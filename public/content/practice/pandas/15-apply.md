---
id: pd-15
topic: Pandas
difficulty: Medium
title: Using Apply
type: MCQ
companyTags: [Stripe]
acceptanceRate: 65
---

# Scenario

You have a custom Python function `def tax(x): return x * 0.1`.
How do you run this on every element of the 'Price' column?

## Options

- `df['Price'].map(tax)`
- `df['Price'].apply(tax)`
- `df['Price'].run(tax)`
- `tax(df['Price'])`

## Correct Answer

```
df['Price'].apply(tax)
```

## Explanation

`apply()` is used to run a function along an axis of the DataFrame or on a Series.
