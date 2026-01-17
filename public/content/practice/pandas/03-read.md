---
id: pd-03
topic: Pandas
difficulty: Basic
title: Reading Files
type: MCQ
companyTags: [Netflix]
acceptanceRate: 92
---

# Scenario

How do you load a file named "data.csv" into a DataFrame?

## Options

- `pd.load('data.csv')`
- `pd.read_file('data.csv')`
- `pd.read_csv('data.csv')`
- `pd.csv('data.csv')`

## Correct Answer

```
pd.read_csv('data.csv')
```

## Explanation

`read_csv` is the standard function. There are also `read_excel`, `read_json`, `read_sql`, etc.
