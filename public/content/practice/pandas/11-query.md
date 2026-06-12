---
id: pd-11
topic: Pandas
difficulty: Medium
title: Query Syntax
type: MCQ
companyTags: [Airbnb]
acceptanceRate: 78
---

# Scenario

Which of the following is valid syntax for filtering a DataFrame using `query()`?

## Options

- `df.query("Age > 25 and City == 'NY'")`
- `df.query(df.Age > 25)`
- `df.query("Age > 25 && City = 'NY'")`
- `df.filter("Age > 25")`

## Correct Answer

```
df.query("Age > 25 and City == 'NY'")
```

## Explanation

`query()` takes a string expression. You use `and` / `or` (not `&` / `|`) and column names directly.
