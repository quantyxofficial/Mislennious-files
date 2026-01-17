---
id: pd-04
topic: Pandas
difficulty: Basic
title: Inspecting Top Rows
type: MCQ
companyTags: [Airbnb]
acceptanceRate: 96
---

# Scenario

You just loaded a massive dataset. What is the safest way to view the first 5 rows?

## Options

- `print(df)`
- `df.head()`
- `df.top()`
- `df[0:5]`

## Correct Answer

```
df.head()
```

## Explanation

`df.head()` returns the first 5 rows by default. Printing the whole `df` can clutter your console or crash a notebook if the file is huge.
