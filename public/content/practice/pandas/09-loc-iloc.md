---
id: pd-09
topic: Pandas
difficulty: Medium
title: loc vs iloc
type: MCQ
companyTags: [Two Sigma]
acceptanceRate: 70
---

# Scenario

You want to access the row at integer position 0. Which one is guaranteed to work regardless of the index type?

## Options

- `df.loc[0]`
- `df.iloc[0]`
- `df[0]`
- `df.ix[0]`

## Correct Answer

```
df.iloc[0]
```

## Explanation

`iloc` stands for **Integer Location**. It always looks at position (0th, 1st, 2nd row).
`loc` looks for the **Label** called "0". If your index is "User_A", "User_B", then `loc[0]` will crash.
