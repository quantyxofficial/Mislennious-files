---
id: np-10
topic: Numpy
difficulty: Medium
title: Reshaping Dimensions
type: MCQ
companyTags: [DeepMind]
acceptanceRate: 60
---

# Scenario

You have an array with 12 elements. You try to run `arr.reshape(3, 5)`. What happens?

## Options

- `It creates a 3x5 matrix, filling missing values with 0.`
- `It creates a 3x5 matrix, filling missing values with Not-a-Number (NaN).`
- `It raises a ValueError.`
- `It drops the last 2 values to make it fit.`

## Correct Answer

```
It raises a ValueError.
```

## Explanation

Reshaping must preserve the total number of elements. `3 * 5 = 15`, but your array only has 12 elements. You cannot magically create or destroy data during a reshape.
