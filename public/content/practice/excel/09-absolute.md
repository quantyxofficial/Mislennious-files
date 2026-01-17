---
id: xl-09
topic: Excel
difficulty: Medium
title: Absolute References
type: MCQ
companyTags: [Analyst]
acceptanceRate: 80
---

# Scenario

You drag the formula `=A1 * $B$1` down one cell. What does it become?

## Options

- `=A2 * $B$2`
- `=A2 * $B$1`
- `=A2 * B1`
- `=A1 * $B$1`

## Correct Answer

```
=A2 * $B$1
```

## Explanation

The dollar signs lock the reference. $B$1 is absolute, so it does not change when dragged. A1 is relative, so it becomes A2.
