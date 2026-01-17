---
id: xl-11
topic: Excel
difficulty: Medium
title: VLOOKUP Syntax
type: MCQ
companyTags: [General]
acceptanceRate: 75
---

# Scenario

In `=VLOOKUP(val, table, 2, FALSE)`, what does `FALSE` mean?

## Options

- `It means the table is not sorted.`
- `It requires an Approximate Match.`
- `It requires an Exact Match.`
- `It means return the error if not found.`

## Correct Answer

```
It requires an Exact Match.
```

## Explanation

`FALSE` (or `0`) forces VLOOKUP to find the exact value. If you omit it or use `TRUE`, Excel might return a "close enough" match, which is dangerous in most business contexts.
