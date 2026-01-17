---
id: np-13
topic: Numpy
difficulty: Medium
title: Boolean Masking
type: MCQ
companyTags: [JPMorgan]
acceptanceRate: 72
---

# Scenario

`arr = np.array([10, 20, 30, 40])`.
You run `arr[arr > 25]`. What do you get?

## Options

- `[30, 40]`
- `[False, False, True, True]`
- `[20, 30, 40]`
- `[10, 20]`

## Correct Answer

```
[30, 40]
```

## Explanation

`arr > 25` creates a boolean mask `[False, False, True, True]`. Indexing with this mask returns only the elements where the value is True.
