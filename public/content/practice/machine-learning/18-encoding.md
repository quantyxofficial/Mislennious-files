---
id: ml-18
topic: Machine Learning
difficulty: Hard
title: One-Hot Encoding
type: MCQ
companyTags: [Preprocessing]
acceptanceRate: 70
---

# Scenario

You have a column "Color" with values ["Red", "Blue", "Green"]. After One-Hot Encoding, how many new columns do you have?

## Options

- `1 Column (0, 1, 2)`
- `2 Columns (if drop_first=True)`
- `3 Columns (Is_Red, Is_Blue, Is_Green)`
- `Both 2 and 3 are correct depending on implementation.`

## Correct Answer

```
Both 2 and 3 are correct depending on implementation.
```

## Explanation

Standard One-Hot produces 3 columns. To avoid Multicollinearity (Dummy Variable Trap), we often use `drop_first=True`, resulting in 2 columns (n-1). Both answers demonstrate understanding.
