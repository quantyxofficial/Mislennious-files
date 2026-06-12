---
id: xl-18
topic: Excel
difficulty: Hard
title: IFS Function
type: MCQ
companyTags: [General]
acceptanceRate: 80
---

# Scenario

You want to assign grades: >90 is A, >80 is B, >70 is C. Which function avoids nested IF statements?

## Options

- `SWITCH`
- `IFS`
- `CHOOSE`
- `IF(AND(...))`

## Correct Answer

```
IFS
```

## Explanation

`=IFS(A1>90, "A", A1>80, "B", A1>70, "C")`. It evaluates conditions in order and stops at the first TRUE.
